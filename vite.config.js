import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import react from '@vitejs/plugin-react'
import preact from "@preact/preset-vite";
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), preact(), svelte()],
})
