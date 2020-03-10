// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { RepoManager } from './lib/repo-manager';
import { openFolderHandler } from './lib/handlers/open-folder.handler';
import { cloneHandler } from './lib/handlers/clone.handler';
import { searchHandler } from './lib/handlers/search.handler';
import { SvelteGenerator } from './lib/html-generation/svelte-generator.class';
import { ExtensionModule } from './extension.module';
// import { join } from 'path';
import { NestFactory } from '@nestjs/core';

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('extension.gitGrok', async () => {
		const panel = vscode.window.createWebviewPanel(
			'gitgrok',
			'GitGrok',
			vscode.ViewColumn.One,
			{ enableScripts: true,
				// localResourceRoots: [vscode.Uri.file(join(context.extensionPath, 'ng', 'dist', 'ng'))]
			 }
		);

		const app = await NestFactory.createApplicationContext(ExtensionModule.forRoot(vscode, panel, context));

		try {
			const html = new SvelteGenerator(vscode, panel, context).getHtml();
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


