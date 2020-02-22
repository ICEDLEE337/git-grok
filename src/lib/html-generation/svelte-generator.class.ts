import { GeneratorBase } from './generator-base.class';
import { execSync } from 'child_process';
export class SvelteGenerator extends GeneratorBase {
    getAssetPaths() { return ['svelte', 'public']; }

    getHtml(): string {
        const code = this.extractAssetContent('bundle.js');
        const html = `
<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>gitgrok</title>

        <link rel="stylesheet" href="${this.asWebviewUri('global.css')}">
        <link rel="stylesheet" href="${this.asWebviewUri('bundle.css')}">
        </head>

        <body>
        <script>window.vscode = acquireVsCodeApi();</script>
        <script>${code}</script>
    </body>
    </html>
    `;
        return html;
    }
}