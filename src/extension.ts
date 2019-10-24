// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { exec, execSync } from 'child_process';
import { join } from 'path';
import ResultTransformer from './lib/result-transformer';
import { RepoManager } from './lib/repo-manager';

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		const panel = vscode.window.createWebviewPanel(
			'gitgrok',
			'GitGrok',
			vscode.ViewColumn.One,
			{ enableScripts: true }
		);

		panel.webview.onDidReceiveMessage(
			message => {
				const { command, payload } = message;
				switch (command) {
					case 'search':
						exec(`git grep --break --heading --line-number -n -F -- "${payload}"`, (err, commandResult) => {
							if (err) {
								vscode.window.showErrorMessage(err.message);
							}

							[commandResult].forEach(src => {
								const searchResult = ResultTransformer.transform(src.toString(), 'blah');
								panel.webview.postMessage({ command: 'searchResult', data: searchResult.matchesRefined });
							});
						});
						return;

					case 'openFile':
						exec(`code ${payload}`);
						return;

					case 'clone':
							const url = payload;
							vscode.window.showInformationMessage(`cloning ${url}}`);
							new RepoManager().clone(url)
								.then(() => vscode.window.showInformationMessage(`successfully cloned ${url}`))
								.catch(() => vscode.window.showErrorMessage(`failed to clone ${url}`));
						return;

					case 'info':
						vscode.window.showInformationMessage(payload);
						return;

					case 'warn':
						vscode.window.showWarningMessage(payload);
						return;

					case 'error':
						vscode.window.showErrorMessage(payload);
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


		panel.webview.html = html;
	});


	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }


