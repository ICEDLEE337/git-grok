<script>
  import { onMount, onDestroy } from "svelte";
  import repoListStore from "../stores/repo-list.store";
  import { postMessage } from "../lib/post-message";
  import Clone from "./Clone.svelte";
  import Icon from "./Icon.svelte";
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
        <Icon name="search" />
      </span>
    </p>
  </div>
  <p class="panel-tabs">
    <button class="is-active" on:click={() => (active = 'filtered')}>
      {filter || 'filtered'}
    </button>
    {#if filter}
      <button class="is-active" on:click={() => (active = 'all')}>all</button>
    {/if}
    <button class="is-active" on:click={() => (active = 'add')}>add</button>
  </p>
  {#if active == 'all'}
    <div in:fly="{{ x: 200, duration: 200 }}" out:fly="{{x: -200, duration: 200}}">
      {#each $repoListStore as repo}
        <div class="panel-block is-active">
          <button href={repo}>{repo}</button>
        </div>
      {/each}
    </div>
  {/if}
  {#if active == 'filtered'}
    <div in:fly="{{ x: 200, duration: 200 }}" out:fly="{{x: -200, duration: 200}}">
      {#each $repoListStore as repo}
        {#if repo.includes((filter || '').toLowerCase())}
          <div class="panel-block is-active">
            <button href={repo}>{repo}</button>
          </div>
        {/if}
      {/each}
    </div>
  {/if}
  {#if active == 'add'}
    <Clone></Clone>
  {/if}
</nav>
