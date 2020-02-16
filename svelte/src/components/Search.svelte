<script>
import Results from './Results.svelte';
import SearchResultSummary from './SearchResultSummary.svelte';
import searchResultStore from '../stores/search-result.store.js';
import {postMessage} from '../lib/post-message';
import Card from './Card.svelte';


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

<Card>
<form on:submit={search}>
<div class="field has-addons">
	<div class="control is-expanded">
    	<input class="input" type="text" bind:value={term} autofocus/>
	</div>
	<div class="control">
    	<button type="submit" class="button is-primary" on:click={search}>&#10003;</button>
	</div>
</div>
</form>

<div>
    <Results results={$searchResultStore} />
</div>
</Card>