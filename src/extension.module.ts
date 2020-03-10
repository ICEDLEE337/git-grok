import { Module, DynamicModule } from '@nestjs/common';
import {WebviewPanel, ExtensionContext} from 'vscode';
import * as vscode from 'vscode';
import { RoutesController } from './routes.controller';

@Module({})
export class ExtensionModule {
    static forRoot (vsc: typeof vscode, panel: WebviewPanel, context: ExtensionContext): DynamicModule {

        return {
            module: ExtensionModule,
            providers: [
                RoutesController,
                {provide: 'vscode', useValue: vsc},
                {provide: 'panel', useValue: panel},
                {provide: 'context', useValue: context},
                {provide: 'webview', useValue: panel.webview}
            ]
        };
    }
}
