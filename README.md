# ctrlv-vscode

Post code to [ctrlv.io](https://ctrlv.io) from VSCode, and get the link in your clipboard.

## Features

Sends either the selected text or the whole file to ctrlv.io, and copies the link to your clipboard.

## Usage

Use the command palette to run the `Post to ctrlv as paste` command.

## Keybindings

Adds `ctrl+alt+v` (`cmd+alt+v` for mac) as a keybinding for the `ctrlv-vscode.post` command.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `ctrlv.host`: The host of the pastebin server. Defaults to `ctrlv.io`.
* `ctrlv.expiresIn`: How long a link lasts for. One of `[0_minutes, 1_hour, 1_day, 3_days, 1_week, 1_month]`.
  Defaults to `1_day`.
* `ctrlv.apiKey`: This is not used yet.

## Known Issues

None yet. I'm sure you can find some. Please open an issue if you do.

## Release Notes

### 0.0.1

Initial release.
