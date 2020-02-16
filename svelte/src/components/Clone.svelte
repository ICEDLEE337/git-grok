<script>

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

<form>
    <input type="text" bind:value={url} />
    {#if url}
        {#if valid}
            <button type="submit" class="is-primary" on:click={clone}>{label}</button>
        {:else}
            {url} is not a valid url
        {/if}
    {/if}
</form>