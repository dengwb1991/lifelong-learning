# 实现简单的状态管理工具

实现 `createStore`，传入初始 `State` 返回 Store。它提供了 subscribe、changeState、getState 三个方法。

subscribe 订阅

changeState 改变状态

getState 获取当前状态

可以通过下面命令运行查看效果

```bash
$ npm start

// or

$ yarn start
```

在该示例中我们定义了两个状态字段，分别是 count 和 name。 我们使用 changeState 分别对他们的值进行修改，结果是没有问题的。但是，我们可以把 count 改为 name，name 改为 count。（这里是指 string 类型与 number 类型交换）

这显然不是我们想要的。
