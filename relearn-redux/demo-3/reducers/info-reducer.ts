import { Action } from '../interface'

export default function (state: any, action: Action) {
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