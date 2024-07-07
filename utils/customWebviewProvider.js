const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
const { loadWebviewHtml, sendFinishMessage, processFetchResponse, 
  listFiles, structureFiles, generateSystemInstructions } = require('./common');

let currentMode = '默认源'
const base = vscode.workspace.getConfiguration('mini-ai-pilot');
const alternate = vscode.workspace.getConfiguration('mini-ai-pilot').get('alternate');
let abortController = null;

const sendModels = (webviewView) => {
  const models = (currentMode === '默认源' ? base.model : alternate.model).split(';')
  webviewView.webview.postMessage({ command: 'models', models: JSON.stringify(models)});
}

class CustomWebviewProvider {
  constructor(extensionUri) {
    this._extensionUri = extensionUri;
    this._webview = null;
  }

  resolveWebviewView(webviewView) {
    this._webview = webviewView;
    loadWebviewHtml(webviewView, this._extensionUri);

    webviewView.webview.onDidReceiveMessage(async (message) => {
      try {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        switch (message.command) {
          case 'fetch':
            // 获取模型和模式
            const {model, mode} = message
            const config = mode === '默认源' ? base : alternate
            const endpoint = config.endpoint;
            const apiKey = config.api_key;
            const maxTokens = config.max_tokens;
            const temperature = config.temperature;
            const maxLength = config.context_length;
            // 组织消息
            const newMessages = JSON.parse(message.messages);
            const totalContentLength = newMessages.reduce((acc, msg) => acc + msg.content.length, 0);
            if (totalContentLength > maxLength) {
              webviewView.webview.postMessage({
                command: 'response',
                finished: true,
                text: '上下文长度超出了最大字符数限制！'
              });
              return;
            }
            abortController = new AbortController();
            const url = endpoint + "/chat/completions";
            const data = {
              max_tokens: maxTokens,
              temperature: temperature,
              stream: true,
              messages: newMessages,
              model
            };
            const headers = {
              "Content-Type": "application/json"
            };
            if (apiKey) {
              headers["Authorization"] = "Bearer " + apiKey;
            }
            try {
              const response = await fetch(url, {
                method: 'POST',
                headers,
                body: JSON.stringify(data),
                signal: abortController.signal
              });
              if (!response.ok) {
                const errorMessage = await response.text();
                webviewView.webview.postMessage({
                  command: 'response',
                  finished: true,
                  text: errorMessage
                });
                return;
              }
              await processFetchResponse(webviewView, response);
            } catch (error) {
              webviewView.webview.postMessage({
                command: 'response',
                finished: true,
                text: error.message
              });
              console.error("Error:", error);
            }
            break;
          case 'abort':
            if (abortController) {
              abortController.abort();
            }
            break;
          case 'files':
            if (workspaceFolders) {
              const folderUri = workspaceFolders[0].uri;
              const files = await listFiles(folderUri);
              const structuredFiles = structureFiles(files);
              webviewView.webview.postMessage({ command: 'files', files: JSON.stringify(structuredFiles) });
            }
            break;
          case 'currentFile':
            const activeEditor = vscode.window.activeTextEditor;
            let currentFile = '';
            if (workspaceFolders && activeEditor) {
              const folderUri = workspaceFolders[0].uri;
              const activeFilePath = activeEditor.document.uri.fsPath;
              currentFile = path.relative(folderUri.fsPath, activeFilePath).replace(/\\/g, '/');
              console.log(currentFile)
            }
            webviewView.webview.postMessage({ command: 'currentFile', currentFile });
            break;
          case 'systemPrompt':
            const clickedFiles = JSON.parse(message.clickedFiles);
            const prompt = await generateSystemInstructions(clickedFiles);
            webviewView.webview.postMessage({ command: 'systemPrompt', prompt });
            break;
          case 'mode':
            currentMode = message.mode
            sendModels(webviewView)
          default:
            break;
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
