<script>
    import Result from './Result.svelte';
    export let results;
</script>

<style>
    .results {
        width: 100%;
        height: 60vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow-y: scroll;
    }
</style>

<div class="results">
    {#each results as result}
    <div>
        <Result {...result} />
    </div>
    {/each}
</div>
