<script>
	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
    import Result from './Result.svelte';
    export let results;
</script>

<style>
    .results {
        display: grid;
		grid-template-columns: repeat(3, 33%);

		grid-gap: 1em
    }
</style>

<div class="results">
    {#each results as result}
    <div transition:crossfade={{in: 2000}}>
        <Result {...result} />
    </div>
    {/each}
</div>