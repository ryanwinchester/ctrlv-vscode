import * as vscode from 'vscode';
import * as https from 'https';

type ReqHeaders = {
  'Content-Type': string,
  'Authorization'?: string
};

type DataSuccess = {
  link: string,
  puid: string,
  expires_at: string,
};

type DataError = {
  errors: string,
};

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('ctrlv.post', async () => {
    const config = vscode.workspace.getConfiguration('ctrlv');
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
      vscode.window.showWarningMessage('No open text editor to copy');
      return;
    }

    const language = editor.document.languageId;
    const selection = editor.selection;

    const content = selection.isEmpty
      ? editor.document.getText()
      : editor.document.getText(selection);

    try {
      const host = config.get('host');
      const apiKey = config.get('apiKey');
      const expiresIn = config.get('expiresIn');

      let headers = {
        'Content-Type': 'application/json',
      } as ReqHeaders;

      if (apiKey) {
        headers['Authorization'] = `Bearer ${apiKey}`;
      }

      const response = await fetch(`${host}/api/paste`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          content: content,
          language: language,
          expires_in: expiresIn,
        }),
      });

      if (response.status === 201) {
        const data = await response.json() as DataSuccess;
        await vscode.env.clipboard.writeText(data.link);
        vscode.window.showInformationMessage('Link copied to clipboard');
      } else {
        const data = await response.json() as DataError;
        vscode.window.showErrorMessage(
          `Error posting code to ${host}: ${JSON.stringify(data.errors)}`
        );
      }
    } catch (error) {
      vscode.window.showErrorMessage(`Error: ${error}`);
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() { }
