<script>
import {postMessage} from '../lib/post-message';
export let matchingLines;
export let name;
export let path;
export let url;

function openFile () {
    postMessage('openFile', path);
}

function openDirectory () {
    postMessage('openDirectory', path);
}

function openUrl () {
    postMessage('openUrl', url);
}
</script>

<div class="result card">
    <header class="card-header">
        <p class="card-header-title">{name}</p>
        <i class="card-header-icon is-info">
            {matchingLines.length}
        </i>
    </header>
    <div class="card-content">
        <div class="content">
            <ul>
                {#each matchingLines as line}
                    <li>{line}</li>
                {/each}
            </ul>
        </div>
    </div>
    <footer class="card-footer">
        <button class="card-footer-item" on:click={openUrl}>repo</button>
        <button class="card-footer-item" on:click={openDirectory}>dir</button>
        <button class="card-footer-item" on:click={openFile}>file</button>
  </footer>
</div>