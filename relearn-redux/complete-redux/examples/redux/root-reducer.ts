import { combineReducers } from 'kana-redux'

import counter from './counter'

const reducers = {
  counter
}

export default combineReducers(reducers)