
export default class Console {

    info (payload) {this.post('info', payload)}
    warn (payload) {this.post('warn', payload)}
    error (payload) {this.post('error', payload)}

    post (level, payload) {
        window.vscode.postMessage(level, payload)
    }
}