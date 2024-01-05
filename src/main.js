import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import SvelteApp from './components/SvelteCounterApp.svelte';

createApp(App).mount('#app')

const app = new SvelteApp({
  target: document.getElementById('svelte-app'),
});
