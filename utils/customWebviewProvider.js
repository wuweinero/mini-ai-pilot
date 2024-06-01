const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
const { loadWebviewHtml, sendFinishMessage, processFetchResponse, 
  listFiles, structureFiles, generateSystemInstructions } = require('./common');

const config = vscode.workspace.getConfiguration('mini-ai-pilot');
const endpoint = config.get('endpoint');
const apiKey = config.get('api_key');
const model = config.get('model');
const maxTokens = config.get('max_tokens');
const temperature = config.get('temperature');
const maxLength = config.get('context_length');
let abortController = null;

class CustomWebviewProvider {
  constructor(extensionUri) {
    this._extensionUri = extensionUri;
    this._webview = null;
  }

  resolveWebviewView(webviewView) {
    this._webview = webviewView;
    loadWebviewHtml(webviewView, this._extensionUri);
    webviewView.webview.postMessage({ command: 'reload', maxLength });

    webviewView.onDidChangeVisibility(() => {
      if (webviewView.visible) {
        webviewView.webview.postMessage({ command: 'reload', maxLength });
      }
    });

    webviewView.webview.onDidReceiveMessage(async (message) => {
      try {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        switch (message.command) {
          case 'fetch':
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
              messages: newMessages
            };
            if (model) {
              data.model = model;
            }
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
