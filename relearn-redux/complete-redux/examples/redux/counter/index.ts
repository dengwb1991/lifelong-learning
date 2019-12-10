import { Action, Dispatch } from '../../interface'

const initState = {
  count: 0
}

export function changeCount (count: number) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: 'CHANGE_COUNT',
      payload: {
        count
      }
    })
  }
}

export default function (state: any, action: Action) {
  if (!state) {
    state = initState
  }
  console.log(action.type)
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: +state.count + 1
      }
    case 'DECREMENT':
      return {
        ...state,
        count: +state.count - 1
      }
    case 'CHANGE_COUNT':
      return {
        ...state,
        count: action.payload.count
      }
    default:
      return state
  }
}