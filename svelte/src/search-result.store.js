import { writable } from 'svelte/store';
import handler from './handler.js';
const searchResultsStore = writable([]);

handler.subscribeTo('searchResult', r => searchResultsStore.update(r));

export default searchResultsStore;