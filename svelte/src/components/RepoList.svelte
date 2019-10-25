<script>
import {onMount} from 'svelte';
import repoListStore from '../stores/repo-list.store';
import {postMessage} from '../lib/post-message';

onMount(() => {
    postMessage('repoList');
});

</script>

<style>
.repo-list {
    display: flex;
    justify-content: stretch;
    flex-direction: column;
}
</style>

<div class="repo-list">
    {#each $repoListStore as repo}
        <div>{repo}</div>
    {/each}
</div>