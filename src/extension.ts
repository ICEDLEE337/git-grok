// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { exec, execSync } from 'child_process';
import { join } from 'path';
import ResultTransformer from './lib/result-transformer';
import { RepoManager } from './lib/repo-manager';
import { PathManager } from './lib/path-manager';
import { openFileHandler } from './lib/handlers/open-file.handler';
import { cloneHandler } from './lib/handlers/clone.handler';
import { searchHandler } from './lib/handlers/search.handler';

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('extension.gitGrok', () => {
		const panel = vscode.window.createWebviewPanel(
			'gitgrok',
			'GitGrok',
			vscode.ViewColumn.One,
			{ enableScripts: true }
		);

		panel.webview.onDidReceiveMessage(
			message => {
				const postMessage = (command: string, payload: any) => {
					panel.webview.postMessage({ command, payload });
				};
				const { command, payload } = message;
				switch (command) {
					case 'search':
						searchHandler(payload, vscode, postMessage);
						return;

					case 'openFile':
						openFileHandler(payload, vscode);
						return;
					case 'clone':
						cloneHandler(payload, vscode);
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

					case 'repoList':
						new RepoManager().getRepoList().then((repos: any) => {
							postMessage(command, repos);
						});
						return;

				}
			},
			undefined,
			context.subscriptions
		);

		function asset(filenameAndExt: string) {
			const onDiskPath = vscode.Uri.file(
				join(context.extensionPath, 'svelte', 'public', filenameAndExt)
			);
			return panel.webview.asWebviewUri(onDiskPath);
		}

		const code = execSync('cat ' + asset('bundle.js').fsPath).toString();


		const html = `
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>gitgrok</title>

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


