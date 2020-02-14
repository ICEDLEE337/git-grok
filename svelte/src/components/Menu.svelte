<script>
import Button from './../components/Btn.svelte';
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

            <a class="navbar-item" class:primary="{link.name == activeName}" on:click={() => nav(link)}>{link.name}</a>

        {/each}
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <button class="button primary">
            <strong>Sign up</strong>
          </button>
          <button class="button secondary">
            Log in
          </button>
        </div>
      </div>
    </div>
  </div>
</nav>

