<script>
import {postMessage} from '../lib/post-message';
export let fileList;
export let matches;
export let path;
export let repo;
export let lineCount;
let activeMatch;

function openFile (p) {
    postMessage('openFile', p);
}

function openDirectory () {
    postMessage('openDirectory', path);
}

function openUrl () {
    postMessage('openUrl', repo);
}

$: activeMatches = matches.filter(m => !activeMatch || m.path === activeMatch)

</script>
<style type="text/scss">
    .pinned {
        position: absolute;

        &.is-right {
            right: 1em;
        }
    }
</style>
<!-- svelte-ignore a11y-missing-attribute -->
<nav class="panel">
  <p class="panel-heading">
    <span>{path}</span>
    <span class="is-right pinned">
        <span class="tag is-info is-rounded">
        files: {fileList.length}
        </span>
        <span class="tag is-info is-rounded">
        lines: {lineCount}
        </span>
    </span>
  </p>

  <p class="panel-tabs" style="overflow-x: scroll;">
    {#each fileList as fileName}
      <a on:click="{()=>{activeMatch = fileName}}">{fileName}</a>
    {/each}
  </p>

  <div class="panel-block">
    <button class="button is-link is-outlined is-fullwidth">
      Reset all filters
    </button>
  </div>
</nav>