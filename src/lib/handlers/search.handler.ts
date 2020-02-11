import { RepoManager } from "../repo-manager";
import { PathManager } from "../path-manager";
import { exec } from "child_process";
import ResultTransformer from "../result-transformer";

export const searchHandler = (payload: string, vscode: any, postMessage: any) => {
    let list: string[];
    let home: string;
    const rm = new RepoManager();
    rm.getRepoList()
        .then(rl => { list = rl; })
        .then(() => PathManager.getHomeDirectory())
        .then((h) => { home = h; })
        .then(() => {
            list.forEach(repo => {
                const cwd = rm.extractProjectDirFromUrl(repo, home);
                vscode.window.showErrorMessage(cwd);

                exec(`git grep --break --heading --line-number -n -F -- "${payload}"`, { cwd }, (err, commandResult) => {
                    if (err) {
                        vscode.window.showErrorMessage(err.message);
                    }

                    [commandResult].forEach(src => {
                        const searchResult = ResultTransformer.transform(src.toString(), repo);
                        postMessage('searchResult', searchResult.matchesRefined);
                    });
                });
            });
        });
};