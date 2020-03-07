<script>
import Logo from './Logo.svelte';
import {routerStore} from '../stores/router.store';
</script>

<style type="text/scss">
@import "../styles/index.scss";

.header-bar {
    max-width: 100%;
    min-width: 100%;
    border-bottom: solid 1px $editor-foreground !important;
    display: flex;
    justify-content: flex-start;
}

.outlet {
    flex: 1;
}
</style>

<header class="header-bar is-info">
    <div><Logo /></div>
    <div class="outlet">
        {#if $routerStore.head}
            <svelte:component this={$routerStore.head}/>
        {/if}
    </div>
</header>