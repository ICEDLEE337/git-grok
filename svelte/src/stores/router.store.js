import { writable } from 'svelte/store';
import SearchComponent from '../components/Search.svelte';

export const routerStore = writable({name: 'Search', component: SearchComponent});