import { Action } from '../interface'

let initState = {
  count: 0
}

export default function (state: any, action: Action) {
  if (!state) {
    state = initState
  }
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1
      }
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1
      }
    default:
      return state
  }
}