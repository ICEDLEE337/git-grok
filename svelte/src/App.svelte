<script>
import {Observable} from 'rxjs';

let now = Observable.create(o => {
	setInterval(() => {
		o.next(new Date());
	}, 1000);
});
	let searchResult = '';
	let term = '';

	window.addEventListener('message', event => {
            const message = event.data;

			const {command} = message;

            switch (command) {
                case 'searchResult':
					searchResult += message.searchResult;
					break;
            }
		});

		let search = function search() {
			if (term.length < 3) {
				return;
			}
			searchResult = '';
			const searchTerm = term;
			window.vscode.postMessage({command: 'searchTerm', searchTerm})
		}
</script>

<style>

</style>
<input type="text" bind:value={term} on:keypress={search} />
<button on:click={search} >search</button>
{searchResult}

{$now}
