<script>
import Results from './Results.svelte';
import Check from './Check.svelte';
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

<SearchResultSummary />

<form on:submit={search}>
<div class="field has-addons">
	<div class="control is-expanded">
    	<input class="input" type="text" bind:value={term} autofocus/>
	</div>
	<div class="control">
    	<button type="submit" class="button is-primary" on:click={search}><Check/></button>
	</div>
</div>
</form>

<div>
    <Results results={$searchResultStore} />
</div>
