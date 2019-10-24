import { writable } from 'svelte/store';

export const routerStore = writable({name: 'Search', component: null});