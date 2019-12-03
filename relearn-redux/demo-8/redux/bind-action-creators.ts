const bindActionCreator = (actionsCreator, dispatch) => {
  return function () {
    return dispatch(actionsCreator.apply(this, arguments))
  }
}

const bindActionCreators = (actionCreators, dispatch): any => {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch)
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error()
  }

  const keys = Object.keys(actionCreators)
  const boundActionCreators = {}

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