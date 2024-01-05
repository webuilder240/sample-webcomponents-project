import { createApp, h } from 'vue';

class VueWebComponent extends HTMLElement {
  constructor() {
    super();
    this.observer = null;
    this.vueApp = null;
  }

  connectedCallback() {
    this.loadVueInstance()
  }

  kebabToPascalCase(str) {
    return str.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
  }

  async loadVueInstance() {
    if (!this.vueApp) {
      // カスタムエレメントの名前を元にVueコンポーネントを特定
      const componentName = this.kebabToPascalCase(this.localName);
      const componentModule = await import(`../../components/${componentName}.vue`);
      const AsyncComponent = componentModule.default;
      
      this.vueApp = createApp({
        render() {
          return h(AsyncComponent);
        }
      });
      this.vueApp.mount(this);
      if (this.observer) {
        this.observer.disconnect();
        this.observer = null;
      }
    }
  }

  unloadVueInstance() {
    if (this.vueApp) {
      this.vueApp.unmount();
      this.vueApp = null;
    }
  }

  disconnectedCallback() {
    if (this.observer) {
      this.observer.disconnect();
    }
    this.unloadVueInstance();
  }
}
export function defineVueElement(tagName) {
  class DynamicClass extends VueWebComponent {}
  customElements.define(tagName, DynamicClass);
  return DynamicClass;
}

