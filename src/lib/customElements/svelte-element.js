class SvelteWebComponent extends HTMLElement {
	constructor() {
		super();
		this.svelteComponent = null;
	}

  kebabToPascalCase(str) {
    return str.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
  }

	async connectedCallback() {
		// カスタムエレメントにSvelteコンポーネントをマウント
    const componentName = this.kebabToPascalCase(this.localName);
    const module = await import(`../../components/${componentName}.svelte`);
    const component = module.default
		this.svelteComponent = new component({
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
