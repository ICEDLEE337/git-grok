<script>
import Results from '../components/Results.svelte';
import Search from '../components/Search.svelte';
import searchResultStore from '../stores/search-result.store';
</script>
<style>
.search {
  width: 100%;
  height: 10vh;
}
.results {
  width: 100%;
  height: 90vh;
}
</style>

<div class="search"><Search /></div>
<div class="results"><Results results={$searchResultStore} /></div>
