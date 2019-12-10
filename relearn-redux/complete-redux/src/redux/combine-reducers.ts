import { Action } from '../interface'

const combineReducers = (reducers: any) => {
  return (state: any = {}, action: Action) => {
    return Object.keys(reducers).reduce((nextState: any, key: string) => {
      nextState[key] = reducers[key](state[key], action)
      return nextState
    }, {})
  }
}

export default combineReducers