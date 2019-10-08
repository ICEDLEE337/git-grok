// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {execSync} from 'child_process';
import { join } from 'path';



// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "lee" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		const panel = vscode.window.createWebviewPanel(
			'catCoding',
			'Cat Coding',
			vscode.ViewColumn.One,
			{enableScripts: true}
		);

		function asset(filenameAndExt: string) {
			// Get path to resource on disk
			const onDiskPath = vscode.Uri.file(
				join(context.extensionPath, 'svelte', 'public', filenameAndExt)
			);

			// And get the special URI to use with the webview
			const catGifSrc = panel.webview.asWebviewUri(onDiskPath);

			return catGifSrc;

		}

		const code = execSync('cat ' + asset('bundle.js').fsPath).toString();
		vscode.window.showErrorMessage(code);


		const html = `
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Cat Coding</title>

				<link rel="stylesheet" href="${asset('global.css')}">
				<link rel="stylesheet" href="${asset('bundle.css')}">

				</head>

				<body>
				// <div id="app">things go here</div>
				<script>${code}</script>
			</body>
			</html>
			`;

			vscode.window.showErrorMessage(html);

			panel.webview.html = html;
	})

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }


