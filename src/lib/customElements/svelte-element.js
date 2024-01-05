// main.js
import MySvelteComponent from '../../components/SvelteCounterApp.svelte';

class SvelteWebComponent extends HTMLElement {
	constructor() {
		super();
		this.svelteComponent = null;
	}

	connectedCallback() {
		// カスタムエレメントにSvelteコンポーネントをマウント
		this.svelteComponent = new MySvelteComponent({
			target: this,
		});
	}

	disconnectedCallback() {
		// Svelteコンポーネントのクリーンアップ
		if (this.svelteComponent) {
			this.svelteComponent.$destroy();
		}
	}
}

export function defineSvelteElement(tagName) {
  class DynamicClass extends SvelteWebComponent {}
  customElements.define(tagName, DynamicClass);
  return DynamicClass;
}
