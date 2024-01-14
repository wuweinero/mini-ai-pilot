const vscode = require('vscode');
const axios = require('axios');

let config = vscode.workspace.getConfiguration('mini-ai-pilot');
let endpoint = config.get('endpoint');
let apiKey = config.get('api_key')
let model = config.get('model')
let temperature = config.get('temperature');
let maxTokens = config.get('max_tokens');
let maxLength = 4000;
let shouldProvideCompletion = false;

async function provideInlineCompletionItems(document, position, context, token) {
  if (!shouldProvideCompletion) {
    return undefined;
  }
  const text = (model.startsWith('gpt') && endpoint.startsWith("https://api")) ? await getCompletionTextGPT(document, position) : await getCompletionText(document, position); 
  let completionItem = new vscode.InlineCompletionItem(text, new vscode.Range(position, position));
  completionItem.range = new vscode.Range(position, position);
  shouldProvideCompletion = false;
  return [completionItem];
}

// 预处理文档
function preprocessDocument(docText) {
  // 分割所有行
  let lines = docText.split("\r\n");
  // 对每一行应用预处理规则
  for(let i = 0; i < lines.length; i++) {
    if(i > 0 && lines[i-1].trim() !== '' && isStartWithComment(lines[i])) {
      lines[i] = "\r\n" + lines[i];
    }
  }
  // 合并所有行
  return lines.join("\r\n");
}

function isStartWithComment(line) {
  let trimLine = line.trim();
  // 定义注释起始字符列表
  let commentStartSymbols = ['//', '#', '/*', '<!--', '{/*'];
  for(let symbol of commentStartSymbols) {
    if(trimLine.startsWith(symbol))
      return true;
  }
  return false;
}

async function getCompletionText(document, position) {
  let language = document.languageId;
  let textBeforeCursor = document.getText(new vscode.Range(new vscode.Position(0, 0), position));
  textBeforeCursor = textBeforeCursor.length > maxLength ? textBeforeCursor.substr(textBeforeCursor.length - maxLength) : textBeforeCursor;
  
  // 对焦点前面的文档进行预处理
  textBeforeCursor = preprocessDocument(textBeforeCursor);

  let prompt = "";
  let stop = ["\n\n", "\r\r", "\r\n\r", "\n\r\n", "```"];
  
  let lineContent = document.lineAt(position.line).text;
  let leftOfCursor = lineContent.substr(0, position.character).trim();
  if (leftOfCursor !== '') {
    stop.push('\r\n');
  }

  if (textBeforeCursor) {
    prompt = "```" + language + "\r\n" + textBeforeCursor;
  } else {
    return;
  }

  let data = {
    "prompt": prompt,
    "max_tokens": 256,
    "temperature": temperature,
    "stream": false,
    "stop": stop
  };
  if (model) {
    data.model = model;
  }
  const headers = {
    'Content-Type': 'application/json',
  };
  if (apiKey) {
    headers['Authorization'] = 'Bearer ' + apiKey;
  }
  let config = {
    method: 'POST',
    url: endpoint + '/completions',
    headers,
    data: JSON.stringify(data)
  };

  try {
    const response = await axios.request(config);
    if (response && response.data && response.data.choices && response.data.choices.length > 0) {
      return response.data.choices[0].text.replace(/[\r\n]+$/g, '');
    }
  } catch (error) {
    console.log("Error:", error.message);
    vscode.window.showErrorMessage("服务访问失败。")
  }
}

async function getCompletionTextGPT(document, position){
  let textBeforeCursor = document.getText(new vscode.Range(new vscode.Position(0, 0), position));
  textBeforeCursor = textBeforeCursor.length > maxLength ? textBeforeCursor.substr(textBeforeCursor.length - maxLength) : textBeforeCursor;
  // 对焦点前面的文档进行预处理
  textBeforeCursor = preprocessDocument(textBeforeCursor);
  // 使用chat/completions接口
  const url = endpoint + "/chat/completions";
  const messages = [
    {"role": "system", "content": "No communication! Just continue writing the code provided by the user."},
    {"role": "user", "content": textBeforeCursor}
  ]
  const data = {
    max_tokens: maxTokens,
    temperature,
    model,
    stream: false,
    messages
  };
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + apiKey
  }
  let text = "";
  try{
    const config = {
      method: 'POST',
      url,
      headers,
      data: JSON.stringify(data)
    }
    const response = await axios.request(config);
    if (response && response.data && response.data.choices && response.data.choices.length > 0) {
      text = response.data.choices[0].message.content
      if (text.startsWith("```")) {
        const textLines = text.split('\n');
        text = textLines.slice(1, textLines.length - 1).join('\n');
      }
    }
  }catch(error){
    console.log("Error:", error);
    vscode.window.showErrorMessage("服务访问失败。")
  }
  return text
}

function triggerInlineCompletion() {
  shouldProvideCompletion = true;
  vscode.commands.executeCommand('editor.action.inlineSuggest.trigger');
}

module.exports = {
  provideInlineCompletionItems,
  triggerInlineCompletion
}