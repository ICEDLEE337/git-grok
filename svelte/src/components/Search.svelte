<script>
import Button from './Button.svelte';
import Results from './Results.svelte';
import SearchResultSummary from './SearchResultSummary.svelte';
import searchResultStore from '../stores/search-result.store.js';
import {postMessage} from '../lib/post-message';

let term = '';

let search = function search() {
	if (!term.trim().length) {
		return;
	}
	searchResultStore.set([]);
	postMessage('search', term);
}
</script>

<style>
</style>

<SearchResultSummary />

<form on:submit={search}>
    <input type="text" bind:value={term} />
    <Button type="submit" on:click={search} label="search" ></Button>
</form>

<div>
    <Results results={$searchResultStore} />
</div>
