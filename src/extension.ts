// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { exec, execSync } from 'child_process';
import { join } from 'path';
import ResultTransformer from './lib/result-transformer';
import { RepoManager } from './lib/repo-manager';
import { PathManager } from './lib/path-manager';
import { openFileHandler } from './lib/handlers/open-file.handler';

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
						let list: string[];
						let home: string;
						const rm = new RepoManager();
						rm.getRepoList()
							.then(rl => { list = rl; })
							.then(() => PathManager.getHomeDirectory())
							.then((h) => { home = h; })
							.then(() => {
								list.forEach(repo => {
									const cwd = rm.extractProjectDirFromUrl(repo, home);
									vscode.window.showErrorMessage(cwd);

									exec(`git grep --break --heading --line-number -n -F -- "${payload}"`, { cwd }, (err, commandResult) => {
										if (err) {
											vscode.window.showErrorMessage(err.message);
										}

										[commandResult].forEach(src => {
											const searchResult = ResultTransformer.transform(src.toString(), repo);
											postMessage('searchResult', searchResult.matchesRefined);
										});
									});
								});
							});
						return;

					case 'openFile':
						openFileHandler(payload, vscode);
						return;
					case 'openFileLessOld':
						PathManager.getHomeDirectory('github.com').then(root => {

							let p = `${root}${payload}`;
							let uri = vscode.Uri.file(p);

							vscode.commands.executeCommand('vscode.openFolder', uri);
						});
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


