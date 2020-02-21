import { join } from "path";

export abstract class GeneratorBase {
    constructor(
        protected readonly vscode: any,
        protected readonly panel: any,
        protected readonly context: any
    ) {
    }

    protected asset(filenameAndExt: string, paths: string[]) {
        const onDiskPath = this.vscode.Uri.file(
            join(this.context.extensionPath, ...paths, filenameAndExt)
        );
        return this.panel.webview.asWebviewUri(onDiskPath);
    }

    abstract getHtml(): string;
}