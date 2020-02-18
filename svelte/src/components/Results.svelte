<script>
    import Result from './Result.svelte';
    export let results;
</script>

<style>
</style>

<div>
    {#each results as result}
        <Result {...result} />
    {/each}
</div>
