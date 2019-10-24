import { execSync } from 'child_process';
import { PathManager } from './path-manager';
import { parse } from 'path';

export class RepoManager {
    async clone(url: string) {
        const home = await PathManager.getHomeDirectory();
        const cwd = this.extractDirToConeInFromUrl(url, home);
        execSync(`mkdir -p ${cwd}`, { encoding: 'utf8'});
        execSync(`git clone ${url}`, { encoding: 'utf8', cwd});
    }

    extractDirToConeInFromUrl (url: string, home: string) {
        return parse(`${home}${url.split('https://')[1]}`).dir;
    }
}