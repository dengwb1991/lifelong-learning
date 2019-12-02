## 添加退订功能

`redux/create-store.ts`

```ts
const subscribe = (listener: Fn) => {
  listeners.push(listener)
  return () => { // unsubscribe
    const index = listeners.indexOf(listener)
    listeners.splice(index, 1)
  }
}
```

使用

```ts
const unsubscribe = store.subscribe(() => {
  const { counter } = store.getState()
  console.log(`count: ${counter.count}`)
})

unsubscribe()
```

## 修改中间件

`redux/apply-middleware.ts`

只让中间件中的 `store` 仅有 `getState()`

```ts
const simpleStore = { getState: store.getState }
const chain = middlewares.map(middleware => middleware(simpleStore))
```

## compose

实现 `compose` 方法，替换 chain.reverse().map(middleware => { dispatch = middleware(dispatch) })

```ts
const compose = (...funcs: any[]) => {
  if (funcs.length === 0) {
    return arg => arg
  }
  if (funcs.length === 1) {
    return funcs[0]
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

export default compose
```

## 省略 initState

`redux/create-store.ts`

```ts
if (typeof initState === 'function' && typeof rewriteCreateStoreFunc === 'undefined') {
  rewriteCreateStoreFunc = initState
  initState = undefined
}
```

## 实现 replaceReducer

`redux/create-store.ts`

```ts
const replaceReducer = (nextReducer: any) => {
  reducer = nextReducer
  dispatch({ type: '' })
}
```

使用

```ts
const reducer = combineReducers({
  counter: counterReducer
})

const nextReducer = combineReducers({
  counter: counterReducer,
  info: infoReducer
})

const store = createStore(reducer)

store.replaceReducer(nextReducer)
```
