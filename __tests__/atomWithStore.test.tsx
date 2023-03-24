import React, { StrictMode } from 'react'
import { act, fireEvent, render } from '@testing-library/react'
import { useAtom } from 'jotai/react'
import { legacy_createStore as createStore } from 'redux'
import { atomWithStore } from '../src/index'

it('count state', async () => {
  const initialState = { count: 0 }
  const reducer = (state = initialState, action: { type: 'INC' }) => {
    if (action.type === 'INC') {
      return { ...state, count: state.count + 1 }
    }
    return state
  }
  const store = createStore(reducer)
  const storeAtom = atomWithStore(store)
  store.dispatch({ type: 'INC' })

  let dispatched

  const Counter = () => {
    const [state, dispatch] = useAtom(storeAtom)

    return (
      <>
        count: {state.count}
        <button
          onClick={() => {
            dispatched = dispatch({ type: 'INC' })
          }}>
          button
        </button>
      </>
    )
  }

  const { findByText, getByText } = render(
    <StrictMode>
      <Counter />
    </StrictMode>
  )

  await findByText('count: 1')

  fireEvent.click(getByText('button'))
  await findByText('count: 2')
  expect(store.getState().count).toBe(2)
  expect(dispatched).toEqual({ type: 'INC' })

  act(() => {
    store.dispatch({ type: 'INC' })
  })
  await findByText('count: 3')
  expect(store.getState().count).toBe(3)
})
