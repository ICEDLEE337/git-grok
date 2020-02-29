import { writable, derived } from 'svelte/store';
const searchResultStore = writable([]);

export default searchResultStore;

export const normalizedSearchResultStore = derived(searchResultStore, ($s, set) => {
    set(toArray(condense($s)));
});


export const repoResultStore = derived(normalizedSearchResultStore, ($s, set) => {
    set(extractRepos($s));
});

function condense(results) {
    const outputMap = {};
    results.forEach(r => {
        outputMap[r.repo] = r;
    });
    return outputMap;
}

function toArray(outputMap) {
    const output = [];
    Object.keys(outputMap).forEach(k => {
        output.push(outputMap[k]);
    });
    return output;
}

function extractRepos(array) {
    return Object.keys(condense(array));
}
