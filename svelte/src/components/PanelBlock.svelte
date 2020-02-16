<script>
import Check from './Check.svelte';
</script>
<nav class="panel">
  <p class="panel-heading">
    repositories
  </p>
  <div class="panel-block">
    <p class="control has-icons-left">
      <input class="input is-small" type="text" placeholder="search">
      <span class="icon is-small is-left">
        <i class="fas fa-search" aria-hidden="true"></i>
      </span>
    </p>
  </div>
  <p class="panel-tabs">
    <a class="is-active">all</a>
    <a>public</a>
    <a>private</a>
    <a>sources</a>
    <a>forks</a>
  </p>
  <a class="panel-block is-active">
    <span class="panel-icon">
      <Check />
    </span>
    bulma
  </a>
  <label class="panel-block">
    <input type="checkbox">
    remember me
  </label>
  <div class="panel-block">
    <button class="button is-link is-outlined is-fullwidth">
      reset all filters
    </button>
  </div>
</nav>