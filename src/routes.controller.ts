import { Controller, Injectable, Inject } from '@nestjs/common';
import { WebviewPanel } from 'vscode';
import { searchHandler } from './lib/handlers/search.handler';
import { openFolderHandler } from './lib/handlers/open-folder.handler';
import { cloneHandler } from './lib/handlers/clone.handler';
import * as vscode from 'vscode';
import {ExtensionContext} from 'vscode';
import { RepoManager } from './lib/repo-manager';

@Injectable()
export class RoutesController {
    constructor(
        @Inject('panel') private readonly panel: WebviewPanel,
        @Inject('vscode') private readonly vscode: typeof vscode,
        @Inject('context') private readonly context: ExtensionContext,
    ) {

    }

    listen() {
        const panel: WebviewPanel = this.panel;
        const vscode = this.vscode;
        const context = this.context;
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
    }
}
