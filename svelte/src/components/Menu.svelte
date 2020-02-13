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

function open () {
    return opened;
}

</script>


<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <div class="navbar-item">
        <Logo />
    </div>

    <a role="button" href="/" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu is-expanded">
    <div class="navbar-start">
        {#each links as link}
            <button class="navbar-item" class:isPrimary="{link == activeName}" on:click={() => nav(link)}>{link.name}</button>
        {/each}
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <button class="button is-primary">
            <strong>Sign up</strong>
          </button>
          <button class="button is-light">
            Log in
          </button>
        </div>
      </div>
    </div>
  </div>
</nav>

