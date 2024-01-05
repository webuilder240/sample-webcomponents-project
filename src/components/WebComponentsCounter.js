export default class WebComponentsCounter extends HTMLElement {
  constructor() {
    super();
    this.count = 0;
    this.innerHTML = `
      <div class="web-components-element">
        <h1>WebComponents Counter App</h1>
        <p id="count">Count: ${this.count}</p>
        <button id="increment">Increment</button>
        <button id="decrement">Decrement</button>
      </div>
    `;
  }
  connectedCallback() {
    this.querySelector('#increment').addEventListener('click', () => this.increment());
    this.querySelector('#decrement').addEventListener('click', () => this.decrement());
    this.render();
  }
  increment() {
    this.count++;
    this.render();
  }
  decrement() {
    this.count--;
    this.render();
  }
  render() {
    this.querySelector('#count').innerHTML = `Count: ${this.count}`;
  }
}
