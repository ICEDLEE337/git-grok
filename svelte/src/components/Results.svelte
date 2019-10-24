<script>
    import Result from './Result.svelte';
    export let results;
</script>

<style>
    .results {
        display: grid;
		grid-template-columns: repeat(3, 33%);

		grid-gap: 1em;
    }
</style>

<div class="results">
    {#each results as result}
    <div>
        <Result {...result} />
    </div>
    {/each}
</div>