import { createStore, combineReducers, bindActionCreators } from './redux'
import reducers from './reducers'

const reducer = combineReducers(reducers)

/**
 * 接收旧的 createStore，返回新的 createStore
 */
const store = createStore(reducer)

/**
 * 返回 action 的函数就叫 actionCreator
 */
const increment = () => {
  return {
    type: 'INCREMENT'
  }
}

const setName = (name: string) => {
  return {
    type: 'SET_NAME',
    payload: { name }
  }
}

// const actions = {
//   increment: function () {
//     return store.dispatch(increment.apply(this, arguments))
//   },
//   setName: function () {
//     return store.dispatch(setName.apply(this, arguments))
//   }
// }

const actions = bindActionCreators({ increment, setName }, store.dispatch)

store.subscribe(() => {
  const { counter, info } = store.getState()
  console.log(`count: ${counter.count}, name: ${info.name}`)
})

actions.increment()
actions.setName('James')
