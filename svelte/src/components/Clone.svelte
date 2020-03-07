<script>

import Icon from './Icon.svelte';
import {postMessage} from '../lib/post-message';
const urlRegex = /https:\/\/.*?\..*?\/.*?\/.*?\.git$/;
let url;
let error;
function clone () {
    if (url && url.length) {
        postMessage('clone', url);
    } else {
        error = 'must define a url to clone';
    }
}
$: label = url && `Clone ${url}`;
$: valid = url && urlRegex.test(url);

</script>


<style type="text/scss">
@import '../styles/index.scss';
</style>

<form class="row">
  <!-- svelte-ignore a11y-autofocus -->
  <input type="text" class="input" bind:value={url} autofocus />
  {#if valid}
      <button type="submit" class="button is-primary" on:click={clone}><Icon name="check_circle"></Icon></button>
  {:else}
      <button type="submit" class="button is-danger" disabled><Icon name="error"></Icon></button>
  {/if}
</form>