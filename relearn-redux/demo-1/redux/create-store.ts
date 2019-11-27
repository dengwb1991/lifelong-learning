
type Fn = () => any

interface Store {
  subscribe: (listener: Fn) => void
  changeState: (newState: any) => void
  getState: () => any
}

export default function createStore (initState: any): Store {
  let state = initState
  let listeners = []

  const subscribe = (listener: Fn) => {
    listeners.push(listener)
  }

  const changeState = (newState: any) => {
    state = newState
    for (let i = 0, len = listeners.length; i < len; i++) {
      const listener = listeners[i]
      listener()
    }
  }

  const getState = () => state

  return {
    subscribe,
    changeState,
    getState
  }
}