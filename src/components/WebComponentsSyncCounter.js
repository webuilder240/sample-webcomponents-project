import SyncCounterStore from '../stores/SyncCounter';

export default class WebComponentsCounter extends HTMLElement {
  constructor() {
    super();
    this.count = 0;
    this.innerHTML = `
      <div class="web-components-element">
        <h1>WebComponents SyncCounter App</h1>
        <p id="count">Count: ${this.count}</p>
        <button id="increment">Increment</button>
        <button id="decrement">Decrement</button>
      </div>
    `;
    SyncCounterStore.onChange(() => {
      const state = SyncCounterStore.getState()
      this.count = state.count
      this.render();
    })
  }
  connectedCallback() {
    this.querySelector('#increment').addEventListener('click', () => this.increment());
    this.querySelector('#decrement').addEventListener('click', () => this.decrement());
    this.render();
  }
  increment() {
    SyncCounterStore.dispatch("increment")
  }
  decrement() {
    SyncCounterStore.dispatch("decrement")
  }
  render() {
    this.querySelector('#count').innerHTML = `Count: ${this.count}`;
  }
}
