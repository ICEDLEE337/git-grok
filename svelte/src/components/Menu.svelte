<script>
import Button from './Button.svelte';
import {routerStore} from '../stores/router.store';
import Search from '../components/Search.svelte';
import Clone from '../components/Clone.svelte';
import RepoList from '../components/RepoList.svelte';
import {postMessage} from '../lib/post-message';
import { onMount } from 'svelte';
export let active;
let links = [
    {name: 'Search', component: Search},
    {name: 'Index a repo', component: Clone},
    {name: 'Repositories', component: RepoList}
];

onMount(() => {
    setActive(active);
    listenToRouter();
});

function nav (link) {
    setActive(link);
    routerStore.set(link);
}

function listenToRouter () {
    routerStore.subscribe(v => postMessage(v));
}

function setActive (link) {
    active = link.name;
}

</script>

<style type="text/scss">
@import '../styles/_variables.scss';
.menu {
    display: flex;
    justify-content: stretch;
    flex-direction: column;
}
</style>

<div class="menu">
    {#each links as link}
        <Button appearance={link.name === active ? 'active' : ''} label={link.name} on:click={() => nav(link)} />
    {/each}
</div>

