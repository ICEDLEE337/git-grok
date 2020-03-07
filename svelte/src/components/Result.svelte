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

</script>
<style type="text/scss">
@import '../styles/index.scss';
</style>
<!-- svelte-ignore a11y-missing-attribute -->
<span class="result card">
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

  <p class="panel-tabs">
    <a class={{'is-primary': !activeMatch}} on:click="{()=>{activeMatch = null}}">all</a>
    {#each fileList as fileName}
      <a class={{'is-primary': fileName == activeMatch}} on:click="{()=>{activeMatch = fileName}}">{fileName}</a>
    {/each}
  </p>

  <!-- <div class="panel-block">
    <button class="button is-link is-outlined is-fullwidth">cd
      Reset all filters
    </button>
  </div> -->
  {#each matches as am}
    <!-- {Object.keys(am).sort().join(' ')} -->
    {#if am.name == activeMatch || !activeMatch}
        {#if !activeMatch}<label>{am.name}</label>{/if}
        {#each am.lines as l}
            <label><code class="is-primary">{l}</code></label>
        {/each}
    {/if}
  {/each}
</span>