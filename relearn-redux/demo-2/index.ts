import { createStore } from './redux'
import reducer from './reducer'

let initState = {
  count: 0
}

let store = createStore(reducer, initState)

store.subscribe(() => {
  const { count } = store.getState()
  console.log(`count: ${count}`)
})

store.dispatch({
  type: 'INCREMENT'
})

store.dispatch({
  type: 'DECREMENT'
})