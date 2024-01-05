import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import SyncCounterStore from '../stores/SyncCounter';

export default function ReactSyncCounter() {
  const [count, setCount] = useState(SyncCounterStore.getState().count);

  useEffect(() => {
    const unsubscribe = SyncCounterStore.onChange(() => {
      setCount(SyncCounterStore.getState().count);
    });

    // コンポーネントのアンマウント時に購読を解除
    return unsubscribe;
  }, []);

  const increment = () => {
    SyncCounterStore.dispatch('increment');
  };

  const decrement = () => {
    SyncCounterStore.dispatch('decrement');
  };

  return (
    <div className="react-element">
      <h1>Preact SyncCounter App</h1>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}
