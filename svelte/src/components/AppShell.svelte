<script>
import {routerStore} from '../stores/router.store';
import Menu from './Menu.svelte';
import Search from './Search.svelte';

</script>

<div class="shell">
    <Menu />
    <svelte:component this={Search}/>
</div>