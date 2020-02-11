import { RepoManager } from "../repo-manager";

export const cloneHandler = (url: string, vscode: any) => {
    vscode.window.showInformationMessage(`cloning ${url}}`);
    new RepoManager().clone(url)
        .then(() => vscode.window.showInformationMessage(`successfully cloned ${url}`))
        .catch(() => vscode.window.showErrorMessage(`failed to clone ${url}`));
};
