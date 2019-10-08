<script>
	let searchResult = '';
	let term;

	window.addEventListener('message', event => {
            const message = event.data;

			const {command} = message;

            switch (command) {
                case 'searchResult':
					searchResult += message.searchResult;
					break;
            }
		});
</script>

<style>

</style>
<input type="text" bind:value={term} />
<button on:click={() => {window.vscode.postMessage({command: 'searchTerm', searchTerm: term})}} >search</button>
{searchResult}
