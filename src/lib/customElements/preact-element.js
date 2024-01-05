import { h, render } from 'preact';

class PreactWebComponent extends HTMLElement {
  constructor() {
    super();
    this.observer = null;
    this.preactRoot = null;
  }

  connectedCallback() {
    this.loadPreactInstance();
  }

  kebabToPascalCase(str) {
    return str.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
  }

  async loadPreactInstance() {
    if (!this.preactRoot) {
      // カスタムエレメントの名前を元にPreactコンポーネントを特定
      const componentName = this.kebabToPascalCase(this.localName);
      const componentModule = await import(`../../components/${componentName}.jsx`);
      const AsyncComponent = componentModule.default;

      // Preact コンポーネントをこのカスタムエレメントにレンダリング
      this.preactRoot = render(h(AsyncComponent, {}), this);
    }
  }

  unloadPreactInstance() {
    if (this.preactRoot) {
      render(null, this, this.preactRoot);
      this.preactRoot = null;
    }
  }

  disconnectedCallback() {
    this.unloadPreactInstance();
  }
}

export function definePreactElement(tagName) {
  class DynamicClass extends PreactWebComponent {}
  customElements.define(tagName, DynamicClass);
  return DynamicClass;
}

