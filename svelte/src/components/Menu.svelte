<script>
import Button from './Button.svelte';
import {routerStore} from '../stores/router.store';
import Search from '../components/Search.svelte';
import Clone from '../components/Clone.svelte';
import RepoList from '../components/RepoList.svelte';
let active;
let links = [
    {name: 'Search', component: Search},
    {name: 'Index a repo', component: Clone},
    {name: 'Repositories', component: RepoList}
];

function nav (link) {
    active = link.name;
    routerStore.set(link);
}

</script>

<style type="text/scss">
@import '../_variables.scss';
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

