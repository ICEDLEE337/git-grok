<script>
import {routerStore} from '../stores/router.store';
import Results from '../components/Results.svelte';
import Search from '../components/Search.svelte';
import Clone from '../components/Clone.svelte';
import Logo from '../components/Logo.svelte';
import RepoList from '../components/RepoList.svelte';
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
