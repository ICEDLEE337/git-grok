<script>

import {Observable} from 'rxjs';
import Results from './results.svelte';

	let searchResult = '';
	let term = '';
	let results = [];

	window.addEventListener('message', event => {
            const message = event.data;

			const {command} = message;

            switch (command) {
                case 'searchResult':
					searchResult += message.searchResult;
					results = message.searchResultNew;
					break;
            }
		});

		let search = function search() {
			if (!term.trim().length) {
				return;
			}
			results = [];
			const searchTerm = term;
			window.vscode.postMessage({command: 'searchTerm', searchTerm})
		}
</script>

<style>
#app {
	color: white;
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