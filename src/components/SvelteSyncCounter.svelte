<script>
  import { onMount, onDestroy } from 'svelte';
  import SyncCounterStore from '../stores/SyncCounter';

  let count = SyncCounterStore.getState().count;

  function updateCount() {
    count = SyncCounterStore.getState().count;
  }

  onMount(() => {
    const unsubscribe = SyncCounterStore.onChange(updateCount);
    // onDestroy(() => {
    //   unsubscribe();
    // });
  });

  function increment() {
    SyncCounterStore.dispatch('increment');
  }

  function decrement() {
    SyncCounterStore.dispatch('decrement');
  }
</script>

<div class="svelte-element">
  <h1>Svelte SyncCounter App</h1>
  <p>Count: {count}</p>
  <button on:click={increment}>Increment</button>
  <button on:click={decrement}>Decrement</button>
</div>
