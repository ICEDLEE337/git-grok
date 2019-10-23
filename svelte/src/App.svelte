<script>
import Search from './components/search.svelte';
import Handler from './handler.js';

new Handler();
</script>

<style>
#app {
	color: var(--vscode-editor-foreground);
	background-color: var(--vscode-editor-background);;
}
</style>

<section id="app">
	<Search />
</section>