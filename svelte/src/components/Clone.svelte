<script>

import {postMessage} from '../lib/post-message';
import Check from './Check.svelte';
import Skull from './Skull.svelte';
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

<form>
<div class="field has-addons">
  <div class="control">
    <input type="text" class="input is-expanded" bind:value={url} />
  </div>
  <div class="control">
    {#if valid}
        <button type="submit" class="button is-success" on:click={clone}><Check/></button>
    {:else}
        <button type="submit" class="button is-danger" disabled><Skull /></button>
    {/if}
  </div>
</div>
</form>