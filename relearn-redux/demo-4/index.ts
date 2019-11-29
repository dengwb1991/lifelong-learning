import { createStore, combineReducers } from './redux'
import reducers from './reducers'

const reducer = combineReducers(reducers)

let store = createStore(reducer)

/**
 * { counter: { count: 0 }, info: { name: 'Xiao Ming' } }
 */
// console.dir(store.getState())

store.subscribe(() => {
  const { counter, info } = store.getState()
  console.log(`count: ${counter.count}`)
  console.log(`name: ${info.name}`)
})

store.dispatch({
  type: 'INCREMENT'
})

store.dispatch({
  type: 'SET_NAME',
  payload: {
    name: 'Ma Dong mei'
  }
})