// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('ctrlv is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('ctrlv.post', () => {
		// Get selected text.
		// If none, get contents of current file.
		// Check config for ctrlv API key.
		// Post to ctrlv API.
		// Get link from response.
		// Put link into clipboard.

		// If it failed show a warning or error message.
		// Display a message box to the user
		vscode.window.showInformationMessage('Link copied to clipboard!');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
