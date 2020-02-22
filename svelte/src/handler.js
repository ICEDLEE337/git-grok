import Console from './lib/console.js';
import searchResultStore from './stores/search-result.store.js';
import repoListStore from './stores/repo-list.store.js';

export default class Handler {
    constructor () {
        this.console = new Console();
        this.handlers = {
            repoList: list => repoListStore.set(list),
            searchResult: newResults => searchResultStore.update(oldResults =>
                Object.assign(oldResults, newResults)
            )
        };
        this.listenToVsCode();
    }

    listenToVsCode() {
        window.addEventListener('message', event => {
            const message = event.data;

            const { command, payload } = message;

            const hndlr = this.handlers[command];
            if (!hndlr) {
                throw new Error(`no handler registered for ${command}`)
            } else {
                try {
                    this.console.info(`executing handler ${command}, ${payload}`);
                    hndlr(payload);
                } catch (e) {
                    this.console.warn(`error executing ${command}: ${e.message}`)
                }
            }
        });
    }
}
