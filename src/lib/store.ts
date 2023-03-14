import { writable } from 'svelte/store';

export const APIKey = writable(localStorage.getItem("APIKey") || "");

APIKey.subscribe(value => localStorage.setItem("APIKey", value));