# 制定约束的状态管理工具

在上一个示例中，我们实现了一个简单的状态管理工具，但是我们无法约束值的修改。

在本示例中，我们添加了一个 reducer 文件，它的作用是对 State 的值的改变进行约束。

于此同时，我们将 Store.changeState() 方法命名为 Store.dispatch()。

## Flow

dispatch(action) -> reducers(previousState, action) -> Store -> store.subscribe(callback)
