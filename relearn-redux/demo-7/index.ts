import { createStore, combineReducers, applyMiddleware } from './redux'
import reducers from './reducers'

import counterReducer from './reducers/counter-reducer'
import infoReducer from './reducers/info-reducer'

import loggerMiddleware from './middlewares/logger-middleware'
import exceptionMiddleware from './middlewares/exception-middleware'
import timeMiddleware from './middlewares/time-middleware'

// const reducer = combineReducers(reducers)

const reducer = combineReducers({
  counter: counterReducer
})

const nextReducer = combineReducers({
  counter: counterReducer,
  info: infoReducer
})
/**
 * 接收旧的 createStore，返回新的 createStore
 */
const rewriteCreateStoreFunc = applyMiddleware(exceptionMiddleware, timeMiddleware, loggerMiddleware)

const store = createStore(reducer, rewriteCreateStoreFunc)

store.replaceReducer(nextReducer)

const unsubscribe = store.subscribe(() => {
  const { counter, info } = store.getState()
  console.log(`count: ${counter.count}, name: ${info.name}`)
})

// unsubscribe()

store.dispatch({
  type: 'INCREMENT'
})

store.dispatch({
  type: 'SET_NAME',
  payload: {
    name: 'James'
  }
})