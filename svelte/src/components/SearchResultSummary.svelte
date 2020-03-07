<script>
import {repoResultStore} from '../stores/search-result.store';

</script>


<style type="text/scss">
@import '../styles/index.scss';
</style>

{#if $repoResultStore.length}
<section class="row">
  <div class="column">
    <p class="subtle center">Repos</p>
    <p class="center">{$repoResultStore.length}</p>
  </div>
</section>
{/if}