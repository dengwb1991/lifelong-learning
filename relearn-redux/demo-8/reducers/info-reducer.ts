import { Action } from '../interface'

let initState = {
  name: 'Xiao Ming'
}

export default function (state: any, action: Action) {
  if (!state) {
    state = initState
  }
  switch (action.type) {
    case 'SET_NAME':
      return {
        ...state,
        name: action.payload.name
      }
    default:
      return state
  }
}