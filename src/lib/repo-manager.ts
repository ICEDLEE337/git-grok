import { execSync } from 'child_process';

export class RepoManager {
    clone(url: string, root: string) {
        execSync(`git clone ${url}`, { encoding: 'utf8', cwd: root });
    }
}