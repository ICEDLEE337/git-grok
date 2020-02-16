import {derived} from 'svelte/store';
import repoListStore from './repo-list.store';

const filteredRepoListStore = derived(repoListStore, $repos => {

});

export default filteredRepoListStore;