<style type="text/scss">
@import '../styles/index.scss';

.git, .grok {
    font-size: 1.6em;
    margin: 0;
}

.git {
    font-size: 1.2em;
}

span {
    justify-items: baseline;
    display: flex;
    flex-direction: row;
    align-content: flex-end;
    align-items: baseline;

    & > * {
        padding: 0;
        margin: 0;
        vertical-align: 0px;
    }
}

</style>

<span>
    <span class="git font-accent">g1t</span><span class="grok font-brand">Gr0k</span><span class="git font-accent">&gt;</span>
</span>
