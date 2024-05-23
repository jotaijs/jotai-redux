import { atom } from 'jotai/vanilla';
import type { Action, Store } from 'redux';

export function atomWithStore<State, A extends Action>(store: Store<State, A>) {
  const baseAtom = atom(store.getState());
  baseAtom.onMount = (setValue) => {
    const callback = () => {
      setValue(store.getState());
    };
    const unsub = store.subscribe(callback);
    callback();
    return unsub;
  };
  const derivedAtom = atom(
    (get) => get(baseAtom),
    (_get, _set, action: A) => store.dispatch(action),
  );
  return derivedAtom;
}
