import Console from './lib/console.js';
import searchResultStore from './stores/search-result.store.js';

export default class Handler {
    constructor () {
        this.handlers = {
            searchResult: r => searchResultStore.set(r),
        };
        this.console = new Console();
        this.listenToVsCode();
    }

    listenToVsCode() {
        window.addEventListener('message', event => {
            const message = event.data;

            const { command, data } = message;

            const hndlr = this.handlers[command];
            if (!hndlr) {
                throw new Error(`no handler registered for ${command}`)
            } else {
                try {
                    this.console.info(`executing handler ${command}`);
                    hndlr(data);
                } catch (e) {
                    this.console.warn(`error executing${command}`)
                }
            }
        });
    }
}
