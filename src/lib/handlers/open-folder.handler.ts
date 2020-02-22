import { PathManager } from "../path-manager";

export const openFolderHandler = (path: string, vscode: any) => {
    const root = PathManager.getHomeDirectory();

    let p = `${root}${path}`;
    let uri = vscode.Uri.file(p);

    vscode.commands.executeCommand('vscode.openFolder', uri);
};
