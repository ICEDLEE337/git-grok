import { execSync } from 'child_process';
import { PathManager } from './path-manager';
import { parse } from 'path';
import { ManifestManager } from './manifest-manager';

export class RepoManager {
	getRepoList(): Promise<Array<string>> {
		return new ManifestManager().getRepoList();
	}
    async clone(url: string) {
        await new ManifestManager().addRepoToManifest(url);
        const home = await PathManager.getHomeDirectory();
        const cwd = await this.extractDirToConeInFromUrl(url, home);
        execSync(`mkdir -p ${cwd}`, { encoding: 'utf8'});
        execSync(`git clone ${url}`, { encoding: 'utf8', cwd});
    }

    extractDirToConeInFromUrl(url: string, home: string): string {
        return parse(`${home}${url.split('https://')[1]}`).dir;
    }

    extractProjectDirFromUrl(url: string, home: string): string {
        const dir = this.extractDirToConeInFromUrl(url, home);
        const segments = url.split('/');
        return `${dir}/${segments[segments.length - 1].replace('.git', '')}`;
    }
}