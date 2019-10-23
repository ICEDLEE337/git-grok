<script>
import Results from './results.svelte';
import Handler from './handler.js';

const handler = new Handler();
handler.listenToVsCode();

let term = '';
let results = [];

handler.subscribeTo('searchResult', data => {
	results = data;
});

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
	background-color: var(--vscode-editor-background);
}
</style>

<section id="app">
	<form on:submit={search}>
		<input type="text" bind:value={term} />
		<button type="submit" on:click={search} >search</button>
	</form>

	<div>
		<Results {results} />
	</div>
</section>