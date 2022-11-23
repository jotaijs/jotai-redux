import React from 'react'
import { atomWithStore } from 'jotai-redux'
import { useAtom } from 'jotai/react'
import { legacy_createStore as createStore } from 'redux'

const initialState = { count: 0 }
const reducer = (state = initialState, action: { type: 'INC' }) => {
  if (action.type === 'INC') {
    return { ...state, count: state.count + 1 }
  }
  return state
}
const store = createStore(reducer)
const storeAtom = atomWithStore(store)

const Counter = () => {
  const [state, dispatch] = useAtom(storeAtom)

  return (
    <>
      count: {state.count}
      <button onClick={() => dispatch({ type: 'INC' })}>inc atom</button>
    </>
  )
}

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <Counter />
      <button onClick={() => store.dispatch({ type: 'INC' })}>inc store</button>
    </div>
  )
}
