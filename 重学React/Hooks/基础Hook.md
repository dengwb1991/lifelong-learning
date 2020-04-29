# Hook

> Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性.

* Hook 使你在无需修改组件结构的情况下复用状态逻辑 （自定义Hook）
* Hook 将组件中相互关联的部分拆分成更小的函数（比如设置订阅或请求数据 Effect Hook）
* Hook 使你在非 class 的情况下可以使用更多的 React 特性
* Hook 和现有代码可以同时工作，你可以渐进式地使用他们


## useState

* 为什么要使用useState？

在 Hooks 出现之前，当我们想要在函数组件内拥有自己的 `state` 时，需要改写为 `class`. 并且状态绑定在 `this` 中

* 使用

```js
const [name, setName] = useState('Jack')
```

`name` 为当前组件的状态，通过 `setName('Tom')` 方法来更改，命名自定义，相当于 `class` 中的 `this.setState()`. 在初始化时 使用 `useState('Jack')` 为 `name` 赋值为 `Jack`. 

### 函数组件

```js
const Example = (props) => {
  // 你可以在这使用 Hook
  return <div />;
}

// or
function Example(props) {
  // 你可以在这使用 Hook
  return <div />;
}
```

* Hook 在 `class` 内部是不起作用的。但你可以使用它们来取代 `class`。

## useEffect

 Effect Hook 将 `class` 组件中的 `componentDidMount`、`componentDidUpdate` 和 `componentWillUnmount` 合为一体，跟 `useState` 一样，你可以在组件中多次使用 `useEffect`.

