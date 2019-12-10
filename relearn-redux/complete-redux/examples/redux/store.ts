import { createStore } from 'kana-redux'
import rootReducer from './root-reducer'

const store = createStore(rootReducer)

export default store