import { PathManager } from "../path-manager";

export const openFileHandler = (payload: string, vscode: any) => {
    PathManager.getHomeDirectory().then(root => {

        let p = `${root}${payload}`;
        let uri = vscode.Uri.file(p);

        vscode.commands.executeCommand('vscode.openFolder', uri);
    });
};
