<script>
import Handler from './handler.js';
const handler = new Handler();
export let name;
export let matchingLines;
function openFile () {
    handler.postTo('openFile', name);
}
</script>

<div class="result">
<h2><button on:click={openFile}>{name}</button></h2>
    {#each matchingLines as line}
        {line}
    {/each}
<p>{name}</p>
</div>

<style>
    .result {
        border-radius: 4px;
        padding: 4px;
        background-color: var(--vscode-editor-foreground);
	    color: var(--vscode-editor-background);
    }

    .result button {
        background-color: var(--vscode-button-background);
        color: var(--vscode-button-foreground);
    }
</style>