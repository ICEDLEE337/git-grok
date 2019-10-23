import Console from './console.js';

export default class Handler {
    constructor () {
        this.console = new Console();
    }

    listenToVsCode() {
        this.handlers = {};
        window.addEventListener('message', event => {
            const message = event.data;

            const { command, data } = message;

            const hndlr = this.handlers[command];
            if (!hndlr) {
                throw new Error(`no handler registered for ${command}`)
            } else {
                try {
                    hndlr(data);
                } catch (e) {
                    this.console.warn(`${command}`)
                }
            }
        });
    }

    subscribeTo(name, handler) {
        if (this.handlers[name]) {
            throw new Error(`${name} is already a registered handler`);
        }

        this.handlers[name] = handler;
    }

    postTo(name, payload) {
        window.vscode.postMessage({command: name, payload})
    }

}