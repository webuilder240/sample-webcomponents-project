// import { createApp } from 'vue'
import './style.css'
// import App from './App.vue'
// import SvelteApp from './components/SvelteCounterApp.svelte';
import { definePreactElement } from "./lib/customElements/preact-element.js"
import { defineVueElement } from "./lib/customElements/vue-element.js"
import { defineSvelteElement } from './lib/customElements/svelte-element.js';
import WebComponentsCounter from './components/WebComponentsCounter.js';
import WebComponentsSyncCounter from './components/WebComponentsSyncCounter.js';

// single-counter
defineVueElement('vue-counter-app');
definePreactElement("counter-app");
defineSvelteElement('svelte-counter-app');
customElements.define('web-components-counter-app', WebComponentsCounter);

// SyncCounter
defineVueElement('vue-sync-counter');
definePreactElement("preact-sync-counter");
defineSvelteElement('svelte-sync-counter');
customElements.define("web-components-sync-counter", WebComponentsSyncCounter);
