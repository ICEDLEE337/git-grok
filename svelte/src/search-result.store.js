import { writable } from 'svelte/store';
import Handler from './handler.js';
const handler = new Handler();
const searchResults = writable([]);

handler.subscribeTo('searchResults', r => searchResults.update(r));

export default searchResults;