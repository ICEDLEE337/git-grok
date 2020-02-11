<script>
import {routerStore} from '../stores/router.store';
import Menu from './Menu.svelte';
import Search from './Search.svelte';

let active = {name: 'Search', component: Search}

routerStore.set(active);

</script>

<style type="text/scss">
@import '../styles/variables.scss';
.shell {
    display: flex;
    .menu {
        padding: $padding;
    }
}
</style>

<h1>GitGrok {$routerStore.name}</h1>

<hr />

<div class="shell">
    <div class="menu" active={active}><Menu/></div>
    <svelte:component this={$routerStore.component}/>
</div>