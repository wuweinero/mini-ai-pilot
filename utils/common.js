const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

const EXCLUDED_FOLDERS = ['node_modules', 'venv', '.git'];
const INCLUDED_EXTENSIONS = ['js', 'py', 'css', 'cs', 'xaml', 'json', 'xml', 'jsx', 'vue', 'md', 'html', 'ts', 'cpp', 'c', 'java', 'yml', 'yaml', 'txt', 'm', 'less', 'scss'];

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
      const decoder = new TextDecoder('utf-8');
      let buffer = ''; // 用于暂存不完整的chunk数据

      const processText = ({ done, value }) => {
        if (done) {
          if (buffer.length > 0 && !buffer.includes('[DONE]')) { // 处理最后一个可能残留在缓冲区的chunk
            processChunk(buffer);
          }
          sendFinishMessage(webviewView);
          resolve();
          return;
        }

        buffer += decoder.decode(value, { stream: true });
        let chunkArray = buffer.split("data:");

        // 处理缓冲区中完整的数据块，最后一个可能是不完整的chunk需要保留在缓冲区中
        buffer = chunkArray.pop(); 

        for (let jsonString of chunkArray) {
          jsonString = jsonString.trim();
          if (jsonString.includes('[DONE]')) {
            sendFinishMessage(webviewView);
            resolve();
            return;
          }
          else if (jsonString.length > 0) {
            processChunk(jsonString);
          }
        }

        return reader.read().then(processText);
      };

      const processChunk = (chunk) => {
        try {
          const payload = JSON.parse(chunk);
          const payloadTemp = payload['choices'][0];
          const sendChunk = payloadTemp['delta'] ? payloadTemp['delta']['content'] : payloadTemp['message']['content'];
          if (sendChunk) {
            webviewView.webview.postMessage({
              command: 'response',
              finished: false,
              text: sendChunk,
            });
          }
        } catch (error) {
          console.log('Error:', error);
        }
      };

      reader.read().then(processText).catch(reject);
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
  const codeInstruction = "请结合上述代码和用户问题，按如下要求进行回答:\n- 对于代码生成或修改问题，首先有条理的阐述问题解决思路，然后再生成或修改代码;\n- 尽可能使用中文交流。";
  let instructionToUse = defaultInstruction;

  // 检查是否有非 md 或 txt 文件
  const hasCodeFiles = filePaths.some(filePath => !['md', 'txt'].includes(filePath.split('.').pop()));
  if (hasCodeFiles) {
    instructionToUse = codeInstruction;
  }

  if (filePaths.length === 0) {
    return instructionToUse;
  }

  try {
    // 按 filePaths 的顺序读取文件内容
    const fileContents = await Promise.all(filePaths.map(async (filePath) => {
      const content = await getContent(filePath);
      if (content) {
        const fileExtension = filePath.split('.').pop();
        if (['txt', 'md'].includes(fileExtension)) {
          return content + '\n\n';
        } else {
          return `## ${filePath}\n\`\`\`${fileExtension}\n${content}\n\`\`\`` + '\n\n';
        }
      }
      return null;
    }));
    // 合并所有文件的内容
    const validContents = fileContents.filter(Boolean).join('');
    // 生成最终的指令
    const finalInstructions = validContents + instructionToUse;
    return finalInstructions;
  } catch (error) {
    console.error('Error generating system instructions:', error);
    return instructionToUse;
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
