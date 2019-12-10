import { Fn, Action, Store, Unsubscribe } from '../interface'

export default function createStore (reducer: any, initState?: any, rewriteCreateStoreFunc?: any): Store {
  if (typeof initState === 'function' && typeof rewriteCreateStoreFunc === 'undefined') {
    rewriteCreateStoreFunc = initState
    initState = undefined
  }

  if (rewriteCreateStoreFunc) {
    const newCreateStore = rewriteCreateStoreFunc(createStore)
    return newCreateStore(reducer, initState)
  }

  let state = initState
  const listeners: any[] = []

  const subscribe = (listener: Fn): Unsubscribe => {
    listeners.push(listener)
    return () => { // unsubscribe
      const index = listeners.indexOf(listener)
      listeners.splice(index, 1)
    }
  }

  const dispatch = (action: Action) => {
    state = reducer(state, action)
    for (let i = 0, len = listeners.length; i < len; i++) {
      const listener = listeners[i]
      listener()
    }
  }

  const replaceReducer = (nextReducer: any) => {
    reducer = nextReducer
    dispatch({ type: '' })
  }

  const getState = () => state

  dispatch({ type: '' }) // init state

  return {
    subscribe,
    dispatch,
    getState,
    replaceReducer
  }
}