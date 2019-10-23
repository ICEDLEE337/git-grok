import postMessage from './post-message';

export default class Console {

    info (payload) {postMessage('info', payload)}
    warn (payload) {postMessage('warn', payload)}
    error (payload) {postMessage('error', payload)}

    post (level, payload) {
        window.vscode.postMessage(level, {payload})
    }
}