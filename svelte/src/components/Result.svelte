<script>
import {postMessage} from '../lib/post-message';
export let name;
export let matchingLines;
function openFile () {
    postMessage('openFile', name);
}
</script>

<div class="result">
    <h2><button on:click={openFile}>{name}</button></h2>
    <hr />
    <ul>
    {#each matchingLines as line}
        <li>{line}</li>
    {/each}
    </ul>
    <hr />
    <small>{matchingLines.length} matching lines</small>
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