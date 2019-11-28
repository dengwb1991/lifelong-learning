import { Fn, Action, Store } from '../interface'

export default function createStore (reducer: any, initState: any): Store {
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

  return {
    subscribe,
    dispatch,
    getState
  }
}