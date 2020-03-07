<script>
import Results from '../components/Results.svelte';
import SearchResultSummary from '../components/SearchResultSummary.svelte';
import {normalizedSearchResultStore} from '../stores/search-result.store';
import searchResultStore from '../stores/search-result.store';
</script>
<style type="text/scss">
@import '../styles/index.scss';
</style>
<div class="search-page">
  <SearchResultSummary></SearchResultSummary>
  <div class="results"><Results results={$normalizedSearchResultStore} /></div>
</div>