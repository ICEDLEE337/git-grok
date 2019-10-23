
export default class Console {

    info () {this.post('info', ...arguments)}
    warn () {this.post('warn', ...arguments)}
    error () {this.post('error', ...arguments)}

    post (level, payload) {
        window.vscode.postMessage(level, payload)
    }
}