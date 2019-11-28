import { createStore, combineReducers } from './redux'
import reducers from './reducers'

let initState = {
  counter: {
    count: 0
  },
  info: {
    name: 'Xiao Ming'
  }
}

const reducer = combineReducers(reducers)

let store = createStore(reducer, initState)

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