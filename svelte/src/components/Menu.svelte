<script>
import {routerStore} from '../stores/router.store';
import Search from '../components/Search.svelte';
import Clone from '../components/Clone.svelte';
let active;
let links = [
    {name: 'Search', component: Search},
    {name: 'Index a repo', component: Clone}
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
    button {
        border: none;
        box-shadow: 1px 1px $button-foreground;
        background-color: $button-background;
        color: $button-foreground;
        padding: 1rem;

        font-family: var(--vscode-font-family);
        font-weight: var(--vscode-font-weight);
	    font-size: var(--vscode-font-size);

        &.active {
            background-color: $button-foreground;
            color: $button-background;
        }
    }
}
</style>

<div class="menu">
    {#each links as link}
        <button class:active={link.name === active} on:click={() => nav(link)}>{link.name}</button>
    {/each}
</div>

