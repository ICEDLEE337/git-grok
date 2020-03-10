import { GeneratorBase } from './generator-base.class';
import { execSync } from 'child_process';
import { readdirSync } from 'fs';
import { resolve } from 'path';
export class NgGenerator extends GeneratorBase {
    dir = 'soundcheck';
    getAssetPaths() { return [this.dir, 'dist', this.dir]; }

    getHtml(): string {
        const html = this.extractAssetContent('index.html');
        return html;
    }
}