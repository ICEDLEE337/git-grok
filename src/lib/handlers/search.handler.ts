import { RepoManager } from "../repo-manager";
import { PathManager } from "../path-manager";
import { exec } from "child_process";
import ResultTransformer from "../result-transformer";

export const searchHandler = (payload: string, vscode: any, postMessage: any) => {
    let list: string[];
    const rm = new RepoManager();
    rm.getRepoList()
        .then(rl => { list = rl; })
        .then(() => PathManager.getHomeDirectory())
        .then((home) => {
            list.forEach(repo => {
                const cwd = rm.extractProjectDirFromUrl(repo, home);
                exec(`git grep --break --heading --line-number -n -F -- "${payload}"`, { cwd }, (err, commandResult) => {
                    if (err) {
                        vscode.window.showErrorMessage(err.message);
                    } else {
                        const searchResult = ResultTransformer.transform(commandResult.toString(), repo);
                        vscode.window.showErrorMessage(JSON.stringify(searchResult, null, 1));
                        searchResult.matches && searchResult.matches.length && postMessage('searchResult', searchResult);
                    }
                });
            });
        });
};