import { writable, derived } from 'svelte/store';
const searchResultStore = writable([]);

export default searchResultStore;

export const normalizedSearchResultStore = derived(searchResultStore, ($s, set) => {
    set(condense($s));
});

function condense(results) {
    const outputMap = {};
    results.forEach(r => {
        outputMap[r.repo] = r;
    });
    return toArray(outputMap);
}

function toArray(outputMap) {
    const output = [];
    Object.keys(outputMap).forEach(k => {
        output.push(outputMap[k]);
    });
    return output;
}
