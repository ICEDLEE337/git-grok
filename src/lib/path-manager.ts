import { exec } from "child_process";
import { resolve } from "path";

export class PathManager {
    static getHomeDirectory(): Promise<string> {
        return new Promise(r => {
            exec('echo $HOME', (_err, stdout) => {
                r(resolve(stdout.toString().split('\n')[0]));
            });
        })
        .then(home => `${home}/.gitgrok/`.replace('//', '/'));
    }
}