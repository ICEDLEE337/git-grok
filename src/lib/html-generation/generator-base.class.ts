import { join } from "path";
import { execSync } from 'child_process';

export abstract class GeneratorBase {
    constructor(
        protected readonly vscode: any,
        protected readonly panel: any,
        protected readonly context: any
    ) {
    }

    protected extractAssetContent(assetName: string, assetPaths: string[]): string {
        return execSync('cat ' + this.asset(assetName, assetPaths).fsPath).toString();
    }

    protected asset(filenameAndExt: string, paths: string[]) {
        const onDiskPath = this.vscode.Uri.file(
            join(this.context.extensionPath, ...paths, filenameAndExt)
        );
        return this.panel.webview.asWebviewUri(onDiskPath);
    }

    abstract getHtml(): string;
}