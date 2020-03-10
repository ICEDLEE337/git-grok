import { GeneratorBase } from './generator-base.class';
import { execSync } from 'child_process';
import { readdirSync } from 'fs';
import { resolve } from 'path';
export class AngularGenerator extends GeneratorBase {
    private readonly scriptRx = /<script\Wsrc=".*?"\W.*?><\/script>/g;

    getHtml(): string {
        return this.getHtmlWithUris();
    }

    private rewriteScriptTag(scriptOuterHtml: string) {
        if (scriptOuterHtml.includes('type="module"'))
        {
            return '';
        }
        const name = scriptOuterHtml
            .replace('<script src="', '')
            .replace('nomodule', '')
            .replace('defer', '')
            .replace('></script>', '');

            return `<script src="${this.asHotFire(name)}"></script>`;
    }

    private extractScriptTags(text: string) {
        return text.match(this.scriptRx);
    }

    private getHtmlWithUris(): string {
        let index = this.extractAssetContent('index.html');
        const scripts = this.extractScriptTags(index);
        scripts && scripts.forEach(oldScriptTag => {
            const newScriptTag = this.rewriteScriptTag(oldScriptTag);
            index = index.replace(oldScriptTag, newScriptTag);
        });

        return index;
    }

}