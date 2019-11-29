import { Fn, Action, Store } from '../interface'

export default function createStore (reducer: any, initState?: any, rewriteCreateStoreFunc?: any): Store {

  if (rewriteCreateStoreFunc) {
    const newCreateStore = rewriteCreateStoreFunc(createStore)
    return newCreateStore(reducer, initState)
  }

  let state = initState
  let listeners = []

  const subscribe = (listener: Fn) => {
    listeners.push(listener)
  }

  const dispatch = (action: Action) => {
    state = reducer(state, action)
    for (let i = 0, len = listeners.length; i < len; i++) {
      const listener = listeners[i]
      listener()
    }
  }

  const getState = () => state

  dispatch({ type: '' }) // init state

  return {
    subscribe,
    dispatch,
    getState
  }
}