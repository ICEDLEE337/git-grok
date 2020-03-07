<script>
    import Result from './Result.svelte';
    export let results;
</script>

<style type="text/scss">
@import "../styles/index.scss";
</style>

<div class="results">
    {#each results as result}
    <div class="result">
        <Result {...result} />
    </div>
    {/each}
</div>
