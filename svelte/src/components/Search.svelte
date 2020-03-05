<script>
import Logo from './Logo.svelte';
import Icon from './Icon.svelte';
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

<style type="text/scss">
@import '../styles/index.scss';
</style>

<form on:submit={search}>
<div class="field has-addons">
	<div class="control">
    	<Logo />
	</div>
	<div class="control is-expanded">
		<!-- svelte-ignore a11y-autofocus -->
    	<input class="input is-shadowless" type="text" bind:value={term} autofocus/>
	</div>
	<div class="control">
    	<button type="submit" class="button is-primary is-shadowless" on:click={search}><Icon name="face" /></button>
	</div>
</div>
</form>
