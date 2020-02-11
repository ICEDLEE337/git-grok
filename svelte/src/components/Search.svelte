<script>
import Results from './Results.svelte';
import SearchResultSummary from './SearchResultSummary.svelte';
import searchResultStore from '../stores/search-result.store.js';
import {postMessage} from '../lib/post-message';
import Button from './Btn.svelte';


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
<div class="field">
    <input class="input" type="text" bind:value={term} autofocus/>
    <Button type="submit" on:click={search} label="search"></Button>
</div>
</form>

<div>
    <Results results={$searchResultStore} />
</div>
