import { exec } from "child_process";

export function execPromise(cmd: string): Promise<any> {
    return new Promise((resolve, reject) => {
        exec(cmd, (err, stdout) => {
            if (err) {
                reject(err);
            } else {
                resolve(stdout.toString());
            }
        });
    });
}