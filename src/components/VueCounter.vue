<template>
  <div class="vue-element">
    <h1>Vue Counter App</h1>
    <p>Count: {{count}}</p>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      count: 0
    }
  },

  methods: {
    increment() {
      this.count+=1
    },
    decrement() {
      this.count-=1
    }
  }
}
</script>
