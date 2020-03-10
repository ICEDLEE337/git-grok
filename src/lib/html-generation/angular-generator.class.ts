import { GeneratorBase } from './generator-base.class';
import { execSync } from 'child_process';
import { readdirSync } from 'fs';
import { resolve } from 'path';
export class AngularGenerator extends GeneratorBase {
    getHtml(): string {
        const html = this.extractAssetContent('index.html');
        return html;
    }
}