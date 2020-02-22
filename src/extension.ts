// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { RepoManager } from './lib/repo-manager';
import { openFileHandler } from './lib/handlers/open-file.handler';
import { cloneHandler } from './lib/handlers/clone.handler';
import { searchHandler } from './lib/handlers/search.handler';
import { SvelteGenerator } from './lib/html-generation/svelte-generator.class';
import { AngularGenerator } from './lib/html-generation/angular-generator.class';
import { join } from 'path';

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('extension.gitGrok', () => {
		const panel = vscode.window.createWebviewPanel(
			'gitgrok',
			'GitGrok',
			vscode.ViewColumn.One,
			{ enableScripts: true,
				localResourceRoots: [vscode.Uri.file(join(context.extensionPath, 'ng', 'dist', 'ng'))]
			 }
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
		try {
			const html = new SvelteGenerator(vscode, panel, context).getHtml();
			vscode.window.showInformationMessage(html);
			panel.webview.html = html;
		}
		catch (e) {
			vscode.window.showWarningMessage(e.message);
		}
	});


	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }


