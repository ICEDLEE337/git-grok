import { join } from "path";
import { execSync } from 'child_process';

export abstract class GeneratorBase {
    constructor(
        protected readonly vscode: any,
        protected readonly panel: any,
        protected readonly context: any
    ) {
    }

    protected log (msg: any) {
        this.vscode.window.showWarningMessage(msg);
    }

    protected extractAssetContent(assetName: string): string {
        const {fsPath} = this.asWebviewUri(assetName);
        const content = execSync(`cat ${fsPath}`).toString();
        return content;
    }

    protected asWebviewUri(filenameAndExt: string) {
        const onDiskPath = this.vscode.Uri.file(
            join(this.context.extensionPath, ...this.getAssetPaths(), filenameAndExt)
        );
        return this.panel.webview.asWebviewUri(onDiskPath);
    }

    abstract getHtml(): string;
    abstract getAssetPaths(): string[];
}