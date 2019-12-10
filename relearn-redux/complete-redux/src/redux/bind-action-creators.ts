import { Store } from '../interface'

const bindActionCreator = (actionsCreator: any, dispatch: Store['dispatch']) => {
  return function () {
    return actionsCreator.apply(this, arguments)(dispatch)
  }
}

const bindActionCreators = (actionCreators: any, dispatch: Store['dispatch']) => {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch)
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error()
  }

  const keys = Object.keys(actionCreators)
  const boundActionCreators: any = {}

  for (let i = 0, len = keys.length; i < len; i++) {
    const key = keys[i]
    const actionCreator = actionCreators[key]
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
    }
  }
  return boundActionCreators
}

export default bindActionCreators