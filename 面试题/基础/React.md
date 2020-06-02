## 一、React 组件声明周期有哪些状态和方法

https://www.runoob.com/react/react-component-life-cycle.html

### 状态

大致分为三个阶段：

1. Mounting：已插入真实 DOM
2. Updating：正在被重新渲染
3. Unmounting：已移出真实 DOM

细分：

1. 设置默认的props属性：es5 中使用 getDafaultProps 函数、es6 中使用class类 static defaultProps
2. 设置状态机, 既初始化state对象：es5 中使用 getInitialState 函数、es6 中执行constructor构造函数 初始化state
3. componentWillMount 组件出现之前
4. render 渲染
5. componentDidMount 组件出现后
6. 整个组件渲染完成


### 渲染过程调用到的生命周期函数

* constructor
* getInitialState 
* getDefaultProps
* componentWillMount
* render
* componentDidMount

### 方法

`componentWillMount` 在渲染前调用,在客户端也在服务端。

`componentDidMount` 在第一次渲染后调用，只在客户端。之后组件已经生成了对应的DOM结构，可以通过this.getDOMNode()来进行访问。 如果你想和其他JavaScript框架一起使用，可以在这个方法中调用setTimeout, setInterval或者发送AJAX请求等操作(防止异步操作阻塞UI)。

`componentWillReceiveProps` 在组件接收到一个新的 prop (更新后)时被调用。这个方法在初始化render时不会被调用。

`shouldComponentUpdate` 返回一个布尔值。在组件接收到新的props或者state时被调用。在初始化时或者使用forceUpdate时不被调用。可以在你确认不需要更新组件时使用。

`componentWillUpdate` 在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用。

`componentDidUpdate` 在组件完成更新后立即调用。在初始化时不会被调用.

`componentWillUnmount` 在组件从 DOM 中移除之前立刻被调用
 
## 二、React 中的 setState 为什么需要异步操作

 1. 保持内部一致性：props 的更新是异步的，因为re-render父组件的时候，传入子组件的props才变化；为了保持数据一致，state也不直接更新，都是在flush的时候更新
 2. 性能优化：将state的更新延缓到最后批量合并再去渲染对于应用的性能优化是有极大好处的，如果每次的状态改变都去重新渲染真实 DONM，那么它将带来巨大的性能消耗

### 什么时候setState会进行同步操作

同步或异步会根据 isBatchingUpdates 值为 true 还是 false，true 同步、false异步.

原生js绑定的事件、setTimeout、setInterval、promise 会将 isBatchingUpdates 值设置为 true.

```js
promise.then(() => {
  // We're not in an event handler, so these are flushed separately.
  this.setState({a: true}); // Re-renders with {a: true, b: false }
  this.setState({b: true}); // Re-renders with {a: true, b: true }
  this.props.setParentState(); // Re-renders the parent
});
```

使用 unstable_batchedUpdates 可以实现同步更新一次渲染，但在 react17后可能会被废弃

```js
promise.then(() => {
  // Forces batching
  ReactDOM.unstable_batchedUpdates(() => {
    this.setState({a: true}); // Doesn't re-render yet
    this.setState({b: true}); // Doesn't re-render yet
    this.props.setParentState(); // Doesn't re-render yet
  });
  // When we exit unstable_batchedUpdates, re-renders once
});
```

## 三、Hooks 与 Class

1. 解决组件之间复用状态逻辑困难问题

React 没有提供将可复用性行为“附加”到组件的途径，目前可以使用 render props 和 高阶组件 来解决，但是他们代码实现过于臃肿。

你可以使用 Hook 从组件中提取状态逻辑，使得这些逻辑可以单独测试并复用。Hook 使你在无需修改组件结构的情况下复用状态逻辑。

2. 解决复杂组件难以理解问题

当组件过于庞大，每个生命周期常常包含一些不相关的逻辑，例如 `componentDidMount` 和 `componentDidUpdate` 中获取数据，但同一个 `componentDidMount` 中可能也包含很多其它的逻辑，如设置事件监听，而之后需在 `componentWillUnmount` 中清除. 状态逻辑无处不在，不想管的代码可能在同一个方法中组合在一起。

Hook 将组件中相互关联的部分拆分成更小的函数（比如设置订阅或请求数据），而并非强制按照生命周期划分。你还可以使用 reducer 来管理组件的内部状态，使其更加可预测。


3. 解决难以理解的 class

使用 Class 必须要理解 JavaScript 中的 this.

## 四、React 运行时

运行时生命周期主要分为 `shouldComponentUpdate`、`componentWillUpdate`、`componentWillReceiveProps`、`componentDidUpdate`


`shouldComponentUpdate` 返回一个布尔值。在组件接收到新的props或者state时被调用。在初始化时或者使用forceUpdate时不被调用。可以在你确认不需要更新组件时使用。

`componentWillUpdate` 在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用。

`componentWillReceiveProps` 在组件接收到一个新的 prop (更新后)时被调用。这个方法在初始化render时不会被调用。

`componentDidUpdate` 在组件完成更新后立即调用。在初始化时不会被调用.