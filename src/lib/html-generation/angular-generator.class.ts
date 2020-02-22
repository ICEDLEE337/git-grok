import { GeneratorBase } from './generator-base.class';

export class AngularGenerator extends GeneratorBase {
    private readonly scriptRx = /<script\Wsrc=".*?"\Wtype="module"><\/script>/g;

    getAssetPaths() {
        return ['ng', 'dist', 'ng'];
    }

    rewriteScriptTag(scriptOuterHtml: string) {
        const name = scriptOuterHtml
            .replace('<script src="', '')
            .replace('" type="module"></script>', '');

            return `<script type="module">${this.asWebviewUri(name)}</script>`;
    }

    extractScriptTags(text: string) {
        return text.match(this.scriptRx);
    }

    getHtml() {
        return this.getHtmlWithUris();
    }

    getHtmlWithUris(): string {
        let index = this.extractAssetContent('index.html');
        const scripts = this.extractScriptTags(index);
        scripts && scripts.forEach(oldScriptTag => {
            const newScriptTag = this.rewriteScriptTag(oldScriptTag);
            index = index.replace(oldScriptTag, newScriptTag);
        });

        return index;
    }

    getHtmlWithEmbeddedJs(): string {
        let index = this.extractAssetContent('index.html');
        const scripts = this.extractScriptTags(index);
        scripts && scripts.forEach(oldScriptTag => {
            const newScriptTag = this.rewriteScriptTag(oldScriptTag);
            index = index.replace(oldScriptTag, newScriptTag);
        });

        return index;
    }
}