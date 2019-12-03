# bindActionCreators

```ts
const increment = () => {
  return {
    type: 'INCREMENT'
  }
}

const setName = (name: string) => {
  return {
    type: 'SET_NAME',
    payload: { name }
  }
}

const actions = {
  increment: function () {
    return store.dispatch(increment.apply(this, arguments))
  },
  setName: function () {
    return store.dispatch(setName.apply(this, arguments))
  }
}

actions.increment()
actions.setName('James')
```

提取公共代码

```ts
const actions = bindActionCreators({ increment, setName }, store.dispatch)
```