<script>
import Icon from './Icon.svelte';
import {onMount} from 'svelte';
import {routerStore} from '../stores/router.store';
import SearchPage from './SearchPage.svelte';
import HeaderBar from './HeaderBar.svelte';
import Search from './Search.svelte';
import Logo from './Logo.svelte';
import Clone from './Clone.svelte';
import RepoList from './RepoList.svelte';
let expanded = false;
const routes = {
    search: {name: 'Search', body: SearchPage, head: Search},
    clone: {name: 'Clone a repository', head: Clone, body: RepoList}
};
onMount(() => {
    const defaultComponent = routes.search;
    routerStore.set(defaultComponent);
});

function navigate (route) {
    expanded = false;
    routerStore.set(route);
}

</script>

<style type="text/scss">
@import '../styles/index.scss';
.shell {
    max-width: 100% !important;
    width: 100% !important;
    padding: 0;
    margin: 0;
}

</style>
<div class="shell">
<div class="header">
    <HeaderBar></HeaderBar>
</div>
    <!-- <div class="row menu">
        <button class="button">
            <section class="row">
                <Logo />
                {#if expanded}
                    <span class="column options" class:expanded>
                        {#each Object.keys(routes) as route}
                            <button class="button" on:click={() => {navigate(routes[route])}}><span class="font-brand">{routes[route].name}</span></button>
                        {/each}
                    </span>
                {/if}
                {#if !expanded}
                    <button class="button" on:click={() => expanded = true}><span class="font-brand">{$routerStore.name}</span></button>
                {/if}
            </section>

        </button>
        {#if $routerStore.head}
            <svelte:component this={$routerStore.head}/>
        {/if}

    </div> -->
        {#if $routerStore.body}
            <div class="outlet">
                <svelte:component this={$routerStore.body}/>
            </div>
        {/if}
</div>
