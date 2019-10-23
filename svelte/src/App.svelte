<script>
import Results from './results.svelte';
import handler from './handler.js';
import searchResultStore from './search-result.store.js';
import Console from './console.js';
handler.listenToVsCode();

let term = '';
let results = [];

let search = function search() {
	if (!term.trim().length) {
		return;
	}
	results = [];
	handler.postTo('search', term);
}

window.addEventListener('error', e => new Console().error(e.message))
</script>

<style>
#app {
	color: var(--vscode-editor-foreground);
	background-color: var(--vscode-editor-background);
}
</style>

<section id="app">
	<form on:submit={search}>
		<input type="text" bind:value={term} />
		<button type="submit" on:click={search} >search</button>
	</form>

	<div>
		<Results results={$searchResultStore} />
	</div>
</section>