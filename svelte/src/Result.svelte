<script>
export let name;
export let matchingLines;
function openFile () {
    window.vscode.postMessage({command: 'openFile', name});
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
        background-color: slategray;
        color: black;
        border-radius: 4px;
        padding: 4px;
    }
</style>