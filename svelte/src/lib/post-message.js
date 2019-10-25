import Console from './console';
const console = new Console();
export const postMessage = (name, payload) => {
    console.info(`posting message to ${name}`)
    window.vscode.postMessage({ command: name, payload });
}
