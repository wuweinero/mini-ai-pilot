const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

let config = vscode.workspace.getConfiguration('mini-ai-pilot');
let endpoint = config.get('endpoint');
let apiKey = config.get('api_key')
let model = config.get('model')
let maxTokens = config.get('max_tokens');
let temperature = config.get('temperature');
let maxLength = config.get('context_length');
let abortController = null;

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
}

const sendFinishMessage = (webviewView) => {
  webviewView.webview.postMessage({
    command: 'response',
    finished: true,
    text: ''
  });
}

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
        
        // 使用 'data:' 的切分
        let chunkArray = chunk.split("data:");
        
        for (let jsonString of chunkArray) {
          jsonString = jsonString.trim();
          if (jsonString === '[DONE]') {
            sendFinishMessage(webviewView);
            resolve();
            return; // 退出循环和processText函数
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


class CustomWebviewProvider {
  constructor(extensionUri) {
    this._extensionUri = extensionUri;
    this._webview = null
  }

  sendSelectMessage() {
    const activeEditor = vscode.window.activeTextEditor;
    let languageId = '';
    if (activeEditor) {
      languageId = activeEditor.document.languageId;
    }
    let selectedText = activeEditor.document.getText(activeEditor.selection);
    // 缩短selectedText的长度
    if (selectedText.length > maxLength - 100) {
      selectedText = selectedText.substring(0, maxLength - 100);
    }
    const formattedCode = '```' + languageId + '\r\n' + selectedText + '\r\n```';
    this._webview.webview.postMessage({
      command: 'select',
      text: selectedText ? formattedCode : ''
    })
  }

  resolveWebviewView(webviewView) {
    this._webview = webviewView
    loadWebviewHtml(webviewView, this._extensionUri);
    webviewView.webview.postMessage({ command: 'reload', maxLength});
    
    webviewView.onDidChangeVisibility(() => {
      if (webviewView.visible) {
        webviewView.webview.postMessage({ command: 'reload', maxLength});
      }
    });

    vscode.window.onDidChangeActiveTextEditor(() => {
      //当活动编辑器发生变化时，移除旧的监听器并添加新的
      if (this.selectionChangeListener) {
        this.selectionChangeListener.dispose();
      }
    });

    webviewView.webview.onDidReceiveMessage(async (message) => {
      try {
        switch (message.command) {
          case 'fetch':
            abortController = new AbortController();
            const url = endpoint + "/chat/completions";
            const data = {
              max_tokens: maxTokens,
              temperature: temperature,
              stream: true,
              messages: JSON.parse(message.messages)
            };
            if(model){
              data.model = model
            }
            const headers = {
              "Content-Type": "application/json"
            };
            if(apiKey){
              headers["Authorization"] = "Bearer " + apiKey
            }
            const response = await fetch(url, {
              method: 'POST',
              headers,
              body: JSON.stringify(data),
              signal: abortController.signal
            })
            await processFetchResponse(webviewView, response)
            break;
          case 'abort-fetch':
            if(abortController){
              abortController.abort()
            }
            break
          default:
            break
        }
      } catch (error) {
        sendFinishMessage(webviewView);
        console.error("Error:", error);
      }
    });
  }
}
module.exports = {
  CustomWebviewProvider
};