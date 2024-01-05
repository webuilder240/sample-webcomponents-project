class MiniEmitter {
  private set: Set<() => void>;

  constructor() {
    this.set = new Set<() => void>();
  }
  on(handler: () => void) {
    this.set.add(handler);
  }
  off(handler: () => void) {
    this.set.delete(handler);
  }
  offAll() {
    this.set.clear();
  }
  emit() {
    this.set.forEach((handler) => handler());
  }
}

export function createStore<S, AN>(options: {
  state: S;
  // eslint-disable-next-line @typescript-eslint/ban-types
  actions: Record<string, Function>;
}) {
  const _state: S = options.state;
  const actions = options.actions;
  const dispathcer = new MiniEmitter();
  const actionNames = Object.keys(actions);

  const actionHandler = {
    get: function (target: any, key: any): any {
      if (typeof target[key] === "object" && target[key] !== null) {
        return new Proxy(target[key], actionHandler);
      } else {
        return target[key];
      }
    },
    set: function (obj: any, prop: string, value: any) {
      obj[prop] = value;
      dispathcer.emit();

      return true;
    },
    deleteProperty: function (obj: any, prop: any) {
			delete obj[prop];
      dispathcer.emit()

			return true;
		}
  };

  const proxyState: S = new Proxy(_state, actionHandler);

  async function dispatch(actionName: AN, ...params: any[]) {
    const key = String(actionName);
    if (actionNames.includes(key)) {
      await actions[key](proxyState, ...params);
    } else {
      throw new Error(`Not Found Action: ${key}`);
    }
  }

  function onChange(callback: () => void) {
    dispathcer.on(callback);
  }

  function getState(): S {
    return proxyState;
  }

  return { dispatch, getState, onChange };
}
