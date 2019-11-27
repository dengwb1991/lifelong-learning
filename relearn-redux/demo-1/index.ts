import { createStore } from './redux'

let initState = {
  state1: {
    count: 0
  },
  state2: {
    name: 'Xiao Ming'
  }
}

let store = createStore(initState)

store.subscribe(() => {
  const { state1 } = store.getState()
  console.log(`count: ${state1.count}`) // 1
})

store.subscribe(() => {
  const { state2 } = store.getState()
  console.log(`name: ${state2.name}`) // Ma Dong mei
})

store.changeState({
  ...store.getState(),
  state1: {
    count: 1
  }
})

store.changeState({
  ...store.getState(),
  state2: {
    name: 'Ma Dong mei'
  }
})