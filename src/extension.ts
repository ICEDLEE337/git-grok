// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { RepoManager } from './lib/repo-manager';
import { openFolderHandler } from './lib/handlers/open-folder.handler';
import { cloneHandler } from './lib/handlers/clone.handler';
import { searchHandler } from './lib/handlers/search.handler';
import { SvelteGenerator } from './lib/html-generation/svelte-generator.class';
import { GeneratorBase } from './lib/html-generation/generator-base.class';
import { NgGenerator } from './lib/html-generation/ng-generator.class';
import { join } from 'path';
// import { join } from 'path';

export function activate(context: vscode.ExtensionContext) {
	const assets = GeneratorBase.enumerateAssets(['soundcheck', 'dist', 'soundcheck']);

	let disposable = vscode.commands.registerCommand('extension.gitGrok', () => {
		const panel = vscode.window.createWebviewPanel(
			'gitgrok',
			'GitGrok',
			vscode.ViewColumn.One,
			{ enableScripts: true,
				localResourceRoots: assets.map(a => vscode.Uri.file(join(context.extensionPath, a)))
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
					case 'openFolder':
						openFolderHandler(payload, vscode);
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
			const html = new NgGenerator(vscode, panel, context).getHtml();
			panel.webview.html = html;
		}
		catch (e) {
			vscode.window.showErrorMessage(e.message);
		}
	});


	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }


