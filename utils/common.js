const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

const EXCLUDED_FOLDERS = ['node_modules', 'venv', '.git'];
const INCLUDED_EXTENSIONS = ['js', 'py', 'css', 'cs', 'xaml', 'json', 'xml', 'jsx', 'vue'];

const loadWebviewHtml = (webviewView, extensionUri) => {
  webviewView.webview.options = {
    enableScripts: true,
    localResourceRoots: [vscode.Uri.file(path.join(extensionUri.fsPath, 'dist'))]
  };

  const indexPath = path.join(extensionUri.fsPath, 'dist', 'index.html');
  let htmlContent = fs.readFileSync(indexPath, 'utf-8');
  
  const resourceRegEx = /<(script|link).*?(src|href)="([^"]*?)".*?\/?>/g;
  htmlContent = htmlContent.replace(resourceRegEx, (match, tag, attribute, src) => {
    const resourcePath = vscode.Uri.file(path.join(extensionUri.fsPath, 'dist', src));
    const resourceUri = webviewView.webview.asWebviewUri(resourcePath);
    return `<${tag} ${attribute}="${resourceUri}" ${tag === 'link' ? 'rel="stylesheet"' : ''}></${tag}>`;
  });

  webviewView.webview.html = htmlContent;
};

const sendFinishMessage = (webviewView) => {
  webviewView.webview.postMessage({
    command: 'response',
    finished: true,
    text: ''
  });
};

const processFetchResponse = (webviewView, response) => {
  return new Promise((resolve, reject) => {
    try {
      const reader = response.body.getReader();
      let decoder = new TextDecoder('utf-8');

      reader.read().then(function processText({ done, value }) {
        if (done) {
          sendFinishMessage(webviewView);
          resolve();
          return;
        }
        let chunk = decoder.decode(value, { stream: true });
        let chunkArray = chunk.split("data:");
        for (let jsonString of chunkArray) {
          jsonString = jsonString.trim();
          if (jsonString === '[DONE]') {
            sendFinishMessage(webviewView);
            resolve();
            return;
          }
          else if (jsonString.length > 0) {
            try {
              const payload = JSON.parse(jsonString);
              let payloadTemp = payload['choices'][0];
              let sendChunk = payloadTemp['delta'] ? payloadTemp['delta']['content'] : payloadTemp['message']['content'];
              sendChunk && webviewView.webview.postMessage({
                command: 'response',
                finished: false,
                text: sendChunk,
              });
            } catch (error) {
              console.log('Error:', error);
            }
          }
        }
        return reader.read().then(processText);
      }).catch(reject);
    } catch (error) {
      reject(error);
    }
  });
};

const listFiles = async (folderUri, folder = '') => {
  let filesList = [];
  const entries = await vscode.workspace.fs.readDirectory(folderUri);
  for (const [name, type] of entries) {
    if (EXCLUDED_FOLDERS.includes(name)) continue;
    const filePath = path.join(folder, name).replace(/\\/g, '/');
    const fileUri = vscode.Uri.joinPath(folderUri, name);
    if (type === vscode.FileType.Directory) {
      const subFiles = await listFiles(fileUri, filePath);
      filesList = filesList.concat(subFiles);
    } else if (INCLUDED_EXTENSIONS.includes(name.split('.').pop())) {
      filesList.push(filePath);
    }
  }
  return filesList;
};

const structureFiles = (files) => {
  const fileTree = [];

  files.forEach(file => {
    const parts = file.split('/');
    let currentLevel = fileTree;

    parts.forEach((part, index) => {
      const existingPath = currentLevel.find(item => item.name === part);
      if (existingPath) {
        currentLevel = existingPath.children;
      } else {
        const newPath = {
          name: part,
          isFolder: index < parts.length - 1,
          children: [],
          key: parts.slice(0, index + 1).join('/')
        };
        currentLevel.push(newPath);
        if (newPath.isFolder) {
          currentLevel = newPath.children;
        }
      }
    });
  });

  return fileTree;
};

const getContent = async (filePath) => {
  try {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders || workspaceFolders.length === 0) {
      throw new Error('No workspace folder is open');
    }
    const workspaceFolder = workspaceFolders[0].uri.fsPath;
    const fullFilePath = path.join(workspaceFolder, filePath);
    const fileUri = vscode.Uri.file(fullFilePath);
    const content = await vscode.workspace.fs.readFile(fileUri);
    return Buffer.from(content).toString('utf8');
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return '';
  }
};

const generateSystemInstructions = async (filePaths) => {
  const defaultInstruction = "请结合上下文信息，对用户的问题进行解答，请尽量使用中文进行交流。";
  
  if (filePaths.length === 0) {
    return defaultInstruction;
  }
  
  try {
    const fileContents = await Promise.all(filePaths.map(async (filePath) => {
      const content = await getContent(filePath);
      if (content) {
        const fileExtension = filePath.split('.').pop();
        return `// ${filePath}\n\`\`\`${fileExtension}\n${content}\n\`\`\``;
      }
      return null;
    }));
    
    const validContents = fileContents.filter(Boolean).join('\n\n');
    return validContents ? validContents + '\n\n' + defaultInstruction : defaultInstruction;
  } catch (error) {
    console.error('Error generating system instructions:', error);
    return defaultInstruction;
  }
};

module.exports = {
  loadWebviewHtml,
  sendFinishMessage,
  processFetchResponse,
  listFiles,
  structureFiles,
  getContent,
  generateSystemInstructions
};