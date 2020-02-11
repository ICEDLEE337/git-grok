<script>
import Results from './Results.svelte';
import SearchResultSummary from './SearchResultSummary.svelte';
import searchResultStore from '../stores/search-result.store.js';
import {postMessage} from '../lib/post-message';
import 'bulma/css/bulma.css'
import { Button } from 'svelma';
import { Input } from 'svelma';
import { Field } from 'svelma';

let term = '';

let search = function search() {
	if (!term.trim().length) {
		return;
	}
	searchResultStore.set([]);
	postMessage('search', term);
}
</script>

<style>

</style>

<SearchResultSummary />

<form on:submit={search}>
<Field label="Search">
    <Input type="text" bind:value={term} autofocus/>
    <Button type="submit" on:click={search} label="search" >Search</Button>
</Field>
</form>

<div>
    <Results results={$searchResultStore} />
</div>
