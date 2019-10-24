<script>
import {routerStore} from '../stores/router.store';
import Search from '../components/Search.svelte';
import Clone from '../components/Clone.svelte';
let links = [
    {name: 'Search', component: Search},
    {name: 'Index a repo', component: Clone}
];

function nav (link) {
    routerStore.set(link);
}

</script>
{$routerStore}
<ul>
    {#each links as link}
        <li on:click={() => nav(link)}>{link.name}</li>
    {/each}
</ul>