<script>
import postMessage from '../lib/post-message';

let url;
let error;

function clone () {
    if (url && url.length) {
        postMessage('clone', url);
    } else {
        error = 'must define a url to clone';
    }
}

</script>
<form>
    <input type="text" bind:value={url} />
    <button type="submit" on:click={clone}>Clone {url}</button>
</form>