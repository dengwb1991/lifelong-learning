import { createStore, combineReducers, applyMiddleware } from './redux'
import reducers from './reducers'

import loggerMiddleware from './middlewares/logger-middleware'
import exceptionMiddleware from './middlewares/exception-middleware'
import timeMiddleware from './middlewares/time-middleware'

const reducer = combineReducers(reducers)

/**
 * 接收旧的 createStore，返回新的 createStore
 */
const rewriteCreateStoreFunc = applyMiddleware(exceptionMiddleware, timeMiddleware, loggerMiddleware)

const store = createStore(reducer, {}, rewriteCreateStoreFunc)

store.subscribe(() => {
  const { counter } = store.getState()
  console.log(`count: ${counter.count}`)
})

store.dispatch({
  type: 'INCREMENT'
})