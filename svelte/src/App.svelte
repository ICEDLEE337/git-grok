<script>
import Clone from './components/Clone.svelte';
import Search from './components/Search.svelte';
import Handler from './handler.js';
import AppShell from './components/AppShell.svelte';

new Handler();
</script>

<style type="text/scss">
@import './styles/index.scss';
#app {
	width: 100%;
	max-width: 100%;
	border: none;
	padding: 0 !important;
	margin: 0 !important;
}
</style>

<svelte:head>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <style src="./styles/_index.scss"></style>
</svelte:head>

<section id="app">
	<AppShell />
</section>
