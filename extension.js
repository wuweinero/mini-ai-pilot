const vscode = require('vscode');
const {provideInlineCompletionItems, triggerInlineCompletion} = require('./utils/inlineCompletionProvider');
const {CustomWebviewProvider} = require('./utils/customWebviewProvider');

function activate(context) {
    
    const languages = ['javascript', 'python', 'java', 'csharp', 'cpp', 'vue', 'html', 'css', 'typescript', 'javascriptreact'];
    let disposables = languages.map(language => {
        return vscode.languages.registerInlineCompletionItemProvider(
            language, { provideInlineCompletionItems }
        );
    });
    disposables.forEach(disposable => context.subscriptions.push(disposable));
    let commandDisposable = vscode.commands.registerCommand('extension.triggerInlineCompletion', triggerInlineCompletion);
    context.subscriptions.push(commandDisposable);

    const customWebviewProvider = new CustomWebviewProvider(context.extensionUri);
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider('sideView', customWebviewProvider)
    );

    let sendSelectedCodeDisposable = vscode.commands.registerCommand('extension.copySelectedCode', () => {
        customWebviewProvider.sendSelectMessage();
    });
    context.subscriptions.push(sendSelectedCodeDisposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}