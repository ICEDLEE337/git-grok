<script>
import Clone from './components/Clone.svelte';
import Search from './components/Search.svelte';
import Handler from './handler.js';
import AppShell from './components/AppShell.svelte';

new Handler();
</script>

<style>
#app {
	color: var(--vscode-editor-foreground);
	background-color: var(--vscode-editor-background);
	font-family: var(--vscode-font-family);
	font-weight: var(--vscode-font-weight);
	font-size: var(--vscode-font-size);
}
</style>

<svelte:head>
  <style src="./styles/_variables.scss"></style>
</svelte:head>

<section id="app">
	<AppShell />
</section>
