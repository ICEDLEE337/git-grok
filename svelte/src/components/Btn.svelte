<script>
export let look;

function primary () {
    return look == 'primary';
}

function secondary () {
    return look == 'secondary';
}
</script>

<style type="text/scss">
</style>

<button on:click class="button" class:primary class:secondary><slot></slot></button>