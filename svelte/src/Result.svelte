<script>
export let name;
export let matchingLines;
</script>

<div class="result">
<h2>{name}</h2>
    {#each matchingLines as line}
        {line}
    {/each}
<p>{name}</p>
</div>

<style>
    .result {
        background-color: azure;
        color: black;
        border-radius: 4px;
        padding: 4px;
    }
</style>