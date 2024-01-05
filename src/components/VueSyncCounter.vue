<template>
  <div class="vue-element">
    <h1>Vue SyncCounter App</h1>
    <p>Count: {{count}}</p>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
  </div>
</template>

<script>
import SyncCounterStore from '../stores/SyncCounter'
export default {
  data() {
    return {
      count: SyncCounterStore.getState().count
    }
  },
  mounted() {
    SyncCounterStore.onChange(() => {
      const state = SyncCounterStore.getState()
      this.count = state.count
    })
  },
  methods: {
    increment() {
      SyncCounterStore.dispatch('increment')
    },
    decrement() {
      SyncCounterStore.dispatch('decrement')
    }
  }
}
</script>
