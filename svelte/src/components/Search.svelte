<script>
import Logo from './Logo.svelte';
import Icon from './Icon.svelte';
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

<style type="text/scss">
@import '../styles/index.scss';
</style>

<form class="row" on:submit={search}>
	<!-- svelte-ignore a11y-autofocus -->
	<input class="input" type="text" bind:value={term} autofocus/>
	<button type="submit" class="button" on:click={search}><Icon name="search" /></button>
</form>
