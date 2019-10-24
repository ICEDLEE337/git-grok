<script>
import Clone from './components/Clone.svelte';
import Search from './components/Search.svelte';
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
	<Clone />
	<Search />
</section>