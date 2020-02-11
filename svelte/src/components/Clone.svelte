<script>

import {postMessage} from '../lib/post-message';
import Button from './Btn.svelte';
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
            <Button type="submit" on:click={clone} label={label}></Button>
        {:else}
            {url} is not a valid url
        {/if}
    {/if}
</form>