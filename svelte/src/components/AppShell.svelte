<script>
import {onMount} from 'svelte';
import {routerStore} from '../stores/router.store';
import SearchPage from './SearchPage.svelte';
import Clone from './Clone.svelte';
const routes = {
    search: {name: 'Search', component: SearchPage},
    clone: {name: 'Clone a repository', component: Clone},
};
onMount(() => {
    const defaultComponent = routes.search;
    routerStore.set(defaultComponent);
});
</script>

<style type="text/scss">
@import '../styles/variables.scss';
</style>

<svelte:component this={$routerStore.component}/>
