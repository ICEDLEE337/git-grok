<script>
import Icon from './Icon.svelte';
import {onMount} from 'svelte';
import {routerStore} from '../stores/router.store';
import SearchPage from './SearchPage.svelte';
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
    height: 100vh;
}

.menu {
    position: fixed;
    top: 0;
    width: 100%;
    max-height: 15vh;
    z-index: 100;
    border-bottom: solid 1px $editor-foreground !important;
    background-color: $editor-background;
}

.body {
    overflow-y: scroll;
    height: 100%;
    width: 100%;
}
</style>
<div class="shell column">
    <div class="row menu">
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

    </div>
    <div class="row body">
        {#if $routerStore.body}
            <svelte:component this={$routerStore.body}/>
        {/if}
    </div>
</div>
