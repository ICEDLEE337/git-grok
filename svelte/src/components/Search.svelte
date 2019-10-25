<script>
import Results from './results.svelte';
import SearchResultSummary from './SearchResultSummary.svelte';
import {searchResultStore } from '../stores/search-result.store.js';
import {postMessage} from '../lib/post-message';

let term = '';
let results = [];

let search = function search() {
	if (!term.trim().length) {
		return;
	}
	results = [];
	postMessage('search', term);
}
</script>

<style>
</style>

<SearchResultSummary />

<form on:submit={search}>
    <input type="text" bind:value={term} />
    <button type="submit" on:click={search} >search</button>
</form>

<div>
    <Results results={$searchResultStore} />
</div>
