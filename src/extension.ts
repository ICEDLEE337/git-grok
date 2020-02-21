// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { RepoManager } from './lib/repo-manager';
import { openFileHandler } from './lib/handlers/open-file.handler';
import { cloneHandler } from './lib/handlers/clone.handler';
import { searchHandler } from './lib/handlers/search.handler';
import { SvelteGenerator } from './lib/html-generation/svelte-generator.class';

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

		panel.webview.html = new SvelteGenerator(vscode, panel, context).getHtml();
	});


	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }


