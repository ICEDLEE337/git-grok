// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { exec, execSync } from 'child_process';
import { join } from 'path';
import ResultTransformer from './lib/result-transformer';

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		const panel = vscode.window.createWebviewPanel(
			'catCoding',
			'Cat Coding',
			vscode.ViewColumn.One,
			{ enableScripts: true }
		);

		const post = panel.webview.postMessage.bind(panel.webview);

		panel.webview.onDidReceiveMessage(
			message => {

				vscode.window.showInformationMessage(message.command + ': ' + message.searchTerm);

				switch (message.command) {
					case 'searchTerm':
						exec(`git grep --break --heading --line-number -n -F -- "${message.searchTerm}"`, (err, searchResult) => {
							if (err) {
								vscode.window.showErrorMessage(err.message);
							}

							[searchResult].forEach(src => {
								const searchResult = ResultTransformer.transform(src.toString(), 'blah');
								vscode.window.showInformationMessage(Object.keys(searchResult.matchesRefined[0]).sort().join(' '));
								panel.webview.postMessage({ command: 'searchResult', searchResult, searchResultNew: searchResult.matchesRefined});
							});
						});
						return;

					case 'openFile':
						exec(`code ${message.name}`);
						return;

					case 'searchTermOld':
						exec(`git grep -F '${message.searchTerm}'`, (err, searchResult, stderr) => {
							if (err) {
								vscode.window.showErrorMessage(err.message);
							}

							[searchResult, stderr].forEach(src => {
								panel.webview.postMessage({ command: 'searchResult', searchResult: src.toString() });
								vscode.window.showInformationMessage(src);
							});
						});
						return;
				}
			},
			undefined,
			context.subscriptions
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
				<script>window.vscode = acquireVsCodeApi();</script>
				<script>${code}</script>
			</body>
			</html>
			`;

		vscode.window.showErrorMessage(html);

		panel.webview.html = html;
	});


	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }


