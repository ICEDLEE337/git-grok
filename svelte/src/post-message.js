export default (name, payload) => {
    window.vscode.postMessage({ command: name, payload })
}
