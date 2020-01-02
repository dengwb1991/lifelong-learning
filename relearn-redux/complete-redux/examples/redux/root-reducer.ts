import { combineReducers } from 'owl-redux'

import counter from './counter'

const reducers = {
  counter
}

export default combineReducers(reducers)