import { createStore } from 'owl-redux'
import rootReducer from './root-reducer'

const store = createStore(rootReducer)

export default store