export default class Console {

    info (payload) {this.postMessage('info', payload)}
    warn (payload) {this.postMessage('warn', payload)}
    error (payload) {this.postMessage('error', payload)}

    postMessage (level, payload) {
        window.vscode.postMessage({ command: level, payload })
    }
}