import compose from './compose'

const applyMiddleware = (...middlewares: any[]) => {
  return (oldCreateStore) => {
    /**
     * 生成新的 createStore
     */
    return function newCreateStore (reducer, initState) {
      /**
       * 生成 store
       */
      const store = oldCreateStore(reducer, initState)
      /**
       * 给每个 middleware 传入 store，相当于 const logger = loggerMiddleware(store)
       * const chain = [exception, time, logger]
       */
      const simpleStore = { getState: store.getState }
      const chain = middlewares.map(middleware => middleware(simpleStore))
      // let dispatch = store.dispatch
      /**
       * 实现 exception(time(logger(dispatch)))
       */
      // chain.reverse().map(middleware => {
      //   dispatch = middleware(dispatch)
      // })
      /**
       * 重写 dispatch
       */
      // store.dispatch = dispatch
      const dispatch = compose(...chain)(store.dispatch)

      return {
        ...store,
        dispatch
      }
    }
  }
}

export default applyMiddleware
