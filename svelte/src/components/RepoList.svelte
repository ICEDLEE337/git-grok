<script>
  import { onMount, onDestroy } from "svelte";
  import repoListStore from "../stores/repo-list.store";
  import { postMessage } from "../lib/post-message";
  import Check from "./Check.svelte";
  import Clone from "./Clone.svelte";
  import { fly } from "svelte/transition";
  let active = "filtered";
  let filter = "";

  onMount(() => {
    postMessage("repoList");
  });
  onDestroy(() => {});
</script>

<nav class="panel">
  <p class="panel-heading">repositories</p>
  <div class="panel-block">
    <p class="control has-icons-left">
      <input
        class="input is-small"
        type="text"
        placeholder="search"
        bind:value={filter} />
      <span class="icon is-small is-left">
        <i class="fas fa-search" aria-hidden="true" />
      </span>
    </p>
  </div>
  <p class="panel-tabs">
    <a class="is-active" on:click={() => (active = 'filtered')}>
      {filter || 'filtered'}
    </a>
    {#if filter}
      <a class="is-active" on:click={() => (active = 'all')}>all</a>
    {/if}
    <a class="is-active" on:click={() => (active = 'add')}>add</a>
  </p>
  {#if active == 'all'}
    <div in:fly="{{ x: 200, duration: 200 }}" out:fly="{{x: -200, duration: 200}}">
      {#each $repoListStore as repo}
        <div class="panel-block is-active">
          <a href={repo}>{repo}</a>
        </div>
      {/each}
    </div>
  {/if}
  {#if active == 'filtered'}
    <div in:fly="{{ x: 200, duration: 200 }}" out:fly="{{x: -200, duration: 200}}">
      {#each $repoListStore as repo}
        {#if repo.includes((filter || '').toLowerCase())}
          <div class="panel-block is-active">
            <a href={repo}>{repo}</a>
          </div>
        {/if}
      {/each}
    </div>
  {/if}
  {#if active == 'add'}
    <Clone></Clone>
  {/if}
</nav>
