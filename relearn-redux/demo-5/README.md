# 中间件 middleware

* 中间件是对 dispatch 的扩展。

如果现在有一个需求，在每次执行 dispatch 时，打印出状态更新的日志。我们该怎么做？看代码

```js
const store = createStore(reducer)
const next = store.dispatch

store.dispatch = (action) => {
  console.log('this state', store.getState())
  console.log('action', action)
  next(action)
  console.log('next state', store.getState())
}
```

使用

```js
store.dispatch({
  type: 'INCREMENT'
})
```

日志输出

```js
this state { counter: { count: 0 } }
action { type: 'INCREMENT' }
1
next state { counter: { count: 1 } }
```

如果我们想要实现多个这样的需求，我们就需要一个通用的中间件来支持了。
