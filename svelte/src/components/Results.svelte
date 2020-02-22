<script>
    import Result from './Result.svelte';
    export let results;
</script>

<style>
</style>

<div>
    {#each results as result}
        {result.repo}
        {result.path}
        {result.matches.length}
        <Result {...result} />
    {/each}
</div>
