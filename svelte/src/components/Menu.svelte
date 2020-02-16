<script>
import {routerStore} from '../stores/router.store';
import Search from '../components/Search.svelte';
import Clone from '../components/Clone.svelte';
import Logo from '../components/Logo.svelte';
import RepoList from '../components/RepoList.svelte';

let activeName;
let opened = true;

let links = [
    {name: 'Search', component: Search},
    {name: 'Index a repo', component: Clone},
    {name: 'Repositories', component: RepoList}
];

function nav (link) {
    setActive(link);
    routerStore.set(link);
}

function setActive (link) {
    activeName = link.name;
}

</script>


<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <div class="navbar-item">
        <Logo />
    </div>

    <a role="button" href="/" class="navbar-burger burger" class:isExpanded={opened == true} on:click="{() => opened = !opened}">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu" class:isExpanded={opened == false}>
    <div class="navbar-start">
        {#each links as link}

            <button class="navbar-item" class:is-primary="{link.name == activeName}" on:click={() => nav(link)}>{link.name}</button>

        {/each}
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <button class="button is-primary">
            <strong>primary</strong>
          </button>
          <button class="button is-danger">
            danger
          </button>
           <button class="button is-info">
            info
          </button>
          <button class="button is-success">
            success
          </button>
        </div>
      </div>
    </div>
  </div>
</nav>

<style type="text/scss">
 nav.navbar {
   background-color: var(--vscode-editor-background);
   color: var(--vscode-editor-foreground);
 }
</style>