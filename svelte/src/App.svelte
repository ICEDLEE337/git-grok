<script>
import {Observable} from 'rxjs';

let now = Observable.create(o => {
	setInterval(() => {
		o.next(new Date());
	}, 1000);
});
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
		{#each results as r}
			<div>
				<h6>{r.name}</h6>
				<hr/>
				<div>
					{#each r.matchingLines as line}
						<li>{line}</li>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</section>