<script>
export let label;
export let appearance;
</script>

<style type="text/scss">
@import '../styles/_variables.scss';

button {
        border: none;
        box-shadow: 1px 1px $button-foreground;
        background-color: $button-background;
        color: $button-foreground;
        padding: 1rem;

        font-family: var(--vscode-font-family);
        font-weight: var(--vscode-font-weight);
	    font-size: var(--vscode-font-size);

        &.active {
            background-color: $button-foreground;
            color: $button-background;
        }
    }
</style>

<button on:click class={appearance}>{label}</button>