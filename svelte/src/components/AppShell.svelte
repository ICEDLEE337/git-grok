<script>
import {onMount} from 'svelte';
import {routerStore} from '../stores/router.store';
import SearchPage from './SearchPage.svelte';
onMount(() => {
    const defaultComponent = {name: 'Search', component: SearchPage};
    routerStore.set(defaultComponent);
});
</script>

<style type="text/scss">
@import '../styles/variables.scss';
</style>

<svelte:component this={$routerStore.component}/>
