import { join, resolve, parse } from "path";
import { execSync } from 'child_process';
import { readdirSync } from "fs";
import { WebviewPanel, ExtensionContext } from "vscode";
import * as IVsCode from 'vscode';

export abstract class GeneratorBase {
    constructor(
        protected readonly vscode: typeof IVsCode,
        protected readonly panel: WebviewPanel,
        protected readonly context: ExtensionContext,
        public readonly assetPathParts: string[]
    ) {
    }

    enumerateAssets(workingDir: string) {
        const root = resolve(workingDir, ...this.assetPathParts);
        return readdirSync(root).map(parse).map(p => p.base);
    }

    protected log(msg: any) {
        this.vscode.window.showWarningMessage(msg);
    }

    protected extractAssetContent(assetName: string): string {
        const { fsPath } = this.asWebviewUri(assetName);
        const content = execSync(`cat ${fsPath}`).toString();
        return content;
    }

    protected asWebviewUri(filenameAndExt: string) {
        const onDiskPath = this.vscode.Uri.file(
            join(this.context.extensionPath, ...this.assetPathParts, filenameAndExt)
        );
        return this.panel.webview.asWebviewUri(onDiskPath);
    }

    protected asHotFire(filenameAndExt: string): string {
        return join(`vscode-resource:`, this.context.extensionPath, ...this.assetPathParts, filenameAndExt)
    }

    abstract getHtml(): string;
}