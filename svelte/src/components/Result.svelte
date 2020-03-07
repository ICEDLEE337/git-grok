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
.result, .panel-tabs{
  padding: $padding;
}

.panel-tabs {
  overflow-x: scroll;
  display: flex;
  justify-content: space-between;

}

code {
  max-width: 100%;
}
</style>

<span class="result">
  <p class="panel-heading font-accent">
    <span>{path}</span>
  </p>
  <p>
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
    <button class="button" class:is-primary={!activeMatch} on:click="{()=>{activeMatch = null}}">all</button>
    {#each fileList as fileName}
      <button class="button" class:is-primary={fileName == activeMatch} on:click="{()=>{activeMatch = fileName}}">{fileName}</button>
    {/each}
  </p>

  {#each matches as am}
    {#if am.name == activeMatch || !activeMatch}
        {#if !activeMatch}<label>{am.name}</label><br />{/if}
        {#each am.lines as l}
            <code>{l}</code><br />
        {/each}
      <hr/>
    {/if}
  {/each}
</span>