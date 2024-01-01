import * as vscode from 'vscode';
import * as https from 'https';

type ReqHeaders = {
  'Content-Type': string,
  'Content-Length': number,
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

    const apiKey = config.get('apiKey');
    const host = config.get('host') || "ctrlv.io";
    const expiresIn = config.get('expiresIn') || "1_day";

    const postData = JSON.stringify({
      content: content,
      language: language,
      expires_in: expiresIn,
    });

    let headers = {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
    }  as ReqHeaders;

    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`;
    }

    const options = {
      hostname: host,
      port: 443,
      path: '/api/paste',
      method: 'POST',
      headers: headers
    } as object;

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', async () => {
        try {
          if (res.statusCode === 201) {
            const response = JSON.parse(data) as DataSuccess;
            await vscode.env.clipboard.writeText(response.link);
            vscode.window.showInformationMessage('Link copied to clipboard');
          } else {
            const response = JSON.parse(data) as DataError;
            vscode.window.showErrorMessage(`Failed to post code: ${JSON.stringify(response)}`);
          }
        } catch (error) {
          vscode.window.showErrorMessage(`Error parsing response: ${error}`);
        }
      });
    });

    req.on('error', (error) => {
      vscode.window.showErrorMessage(`Request error: ${error}`);
    });

    req.write(postData);
    req.end();
  });

  context.subscriptions.push(disposable);
}

export function deactivate() { }
