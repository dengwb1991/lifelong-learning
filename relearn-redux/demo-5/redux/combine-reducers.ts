import { Action } from '../interface'

const combineReducers = (reducers: {}) => {
  return (state = {}, action: Action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action)
      return nextState
    }, {})
  }
}

export default combineReducers