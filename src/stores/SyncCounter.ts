import { createStore } from "../lib/CreateStore";

type SyncCounterState = {
  count: number;
}

const state: SyncCounterState = {
  count: 0,
}

const actions = {
  increment: (state: SyncCounterState) => {
    state.count++;
  },
  decrement: (state: SyncCounterState) => {
    state.count--;
  },
}

export default createStore<SyncCounterState, keyof typeof actions>({
  state,
  actions,
});
