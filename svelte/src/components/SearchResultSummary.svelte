<script>
import {repoResultStore} from '../stores/search-result.store';

</script>


<style type="text/scss">
@import '../styles/index.scss';

.summary {
  display: flex;
  justify-content: center;
  justify-items: center;
  align-items: center;
  align-content: center;
}

</style>

{#if $repoResultStore.length}
<section class="summary">
  <div class="button">
    <p class="font-accent center">Repos</p>
    <hr />
    <p class="center">{$repoResultStore.length}</p>
  </div>
</section>
{/if}