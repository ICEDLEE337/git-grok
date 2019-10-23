<script>
import Results from './results.svelte';
import Handler from './handler.js';
import searchResultStore from './search-result.store.js';
import Console from './console.js';
const handler = new Handler();
let term = '';
let results = [];

let search = function search() {
	if (!term.trim().length) {
		return;
	}
	results = [];
	handler.postTo('search', term);
}


</script>

<style>
#app {
	color: var(--vscode-editor-foreground);
	background-color: hotpink;
}
</style>

<section id="app">
	<form on:submit={search}>
		<input type="text" bind:value={term} />
		<button type="submit" on:click={search} >search</button>
	</form>
{$searchResultStore}
	<div>
		<Results results={$searchResultStore} />
	</div>
</section>