# 重学 Redux

你必须知道的一些事儿：

* redux 和 react 没有关系，redux 可以用在任何框架中
* connect 不属于 redux，它其实属于 react-redux
* redux 是一个状态管理器

## 注意

在示例中大量使用了 TypeScript 语法，若读者对 TypeScript 还不了解，可以点击下面的链接进行阅读。

[TypeScript 开发教程](https://www.dengwb.com/typescript)

## API

| api | 说明 |
| -- | -- |
| createStore | 创建 store 对象，包含 getState, dispatch, subscribe, replaceReducer |
| reducer | reducer 是一个计划函数，接收旧的 state 和 action，生成新的 state |
| action | action 是一个对象，必须包含 type 字段 |
| dispatch | dispatch( action ) 触发 action，生成新的 state |
| subscribe | 实现订阅功能，每次触发 dispatch 的时候，会执行订阅函数 |
| combineReducers | 多 reducer 合并成一个 reducer |
| replaceReducer | 替换 reducer 函数 | 
| middleware | 扩展 dispatch 函数 |

## 更多

[Redux Flow & API](https://notes.dengwb.com/react/redux.html)

[完全理解 redux](https://github.com/brickspert/blog/issues/22)