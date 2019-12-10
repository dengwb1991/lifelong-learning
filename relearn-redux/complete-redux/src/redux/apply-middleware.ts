import compose from './compose'

const applyMiddleware = (...middlewares: any[]) => {
  return (oldCreateStore: any) => {
    return function newCreateStore (reducer: any, initState: any) {
      const store = oldCreateStore(reducer, initState)
      const simpleStore = { getState: store.getState }
      const chain = middlewares.map(middleware => middleware(simpleStore))
      const dispatch = compose(...chain)(store.dispatch)

      return {
        ...store,
        dispatch
      }
    }
  }
}

export default applyMiddleware
