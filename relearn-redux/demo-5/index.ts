import { createStore, combineReducers } from './redux'
import reducers from './reducers'

import loggerMiddleware from './middlewares/logger-middleware'
import exceptionMiddleware from './middlewares/exception-middleware'
import timeMiddleware from './middlewares/time-middleware'

const reducer = combineReducers(reducers)

const store = createStore(reducer)
const next = store.dispatch

const logger = loggerMiddleware(store)
const exception = exceptionMiddleware(store)
const time = timeMiddleware(store)

store.dispatch = exception(time(logger(next)))

store.subscribe(() => {
  const { counter } = store.getState()
  console.log(`count: ${counter.count}`)
})

store.dispatch({
  type: 'INCREMENT'
})