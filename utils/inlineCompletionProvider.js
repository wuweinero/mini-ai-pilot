const vscode = require('vscode');
const axios = require('axios');

let config = vscode.workspace.getConfiguration('mini-ai-pilot');
let endpoint = config.get('endpoint');
let temperature = config.get('temperature');
let maxLength = 4000;
let shouldProvideCompletion = false;

async function provideInlineCompletionItems(document, position, context, token) {
  if (!shouldProvideCompletion) {
    return undefined;
  }
  const text = await getCompletionText(document, position); 
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
  let textAfterCursor = document.getText(new vscode.Range(position, new vscode.Position(document.lineCount, 0)));
  const maxLengthBeforeCursor = textAfterCursor ? maxLength / 2 : maxLength;

  textBeforeCursor = textBeforeCursor.length > maxLengthBeforeCursor ? textBeforeCursor.substr(textBeforeCursor.length - maxLengthBeforeCursor) : textBeforeCursor;
  if (textAfterCursor && textAfterCursor.length > maxLength / 2) {
    textAfterCursor = textAfterCursor.substr(0, maxLength / 2);
  }
  
  // 对焦点前面的文档进行预处理
  textBeforeCursor = preprocessDocument(textBeforeCursor);

  let prompt = "";
  let stop = ["\n\n", "\r\r", "\r\n\r", "\n\r\n", "```"];
  
  let lineContent = document.lineAt(position.line).text;
  let leftOfCursor = lineContent.substr(0, position.character).trim();
  if (leftOfCursor !== '') {
    stop.push('\r\n');
  }

  if (textBeforeCursor && textAfterCursor) {
    prompt = "```" + language + "\r\n<｜fim▁begin｜>" + textBeforeCursor + "<｜fim▁hole｜>" + textAfterCursor + "<｜fim▁end｜>";
  } else if (textBeforeCursor) {
    prompt = "```" + language + "\r\n" + textBeforeCursor;
  } else {
    return;
  }

  let data = JSON.stringify({
    "prompt": prompt,
    "max_tokens": 256,
    "temperature": temperature,
    "stream": false,
    "stop": stop
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: endpoint + '/v1/completions',
    headers: {'Content-Type': 'application/json'},
    data: data
  };

  try {
    const response = await axios.request(config);
    if (response && response.data && response.data.choices && response.data.choices.length > 0) {
      return response.data.choices[0].text.replace(/[\r\n]+$/g, '');
    }
  } catch (error) {
    console.log(error);
  }
}

function triggerInlineCompletion() {
  shouldProvideCompletion = true;
  vscode.commands.executeCommand('editor.action.inlineSuggest.trigger');
}

module.exports = {
  provideInlineCompletionItems,
  triggerInlineCompletion
}