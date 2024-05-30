const vscode = require('vscode');
const {CustomWebviewProvider} = require('./utils/customWebviewProvider');

function activate(context) {
    const customWebviewProvider = new CustomWebviewProvider(context.extensionUri);
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider('sideView', customWebviewProvider)
    );
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}
