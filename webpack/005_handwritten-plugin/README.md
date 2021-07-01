# 手写 Plugin

## 什么是webpack插件

一个完成的 webpack 插件需要满足以下几点特征

1. 是一个独立的js模块
2. 模块对外暴露一个js函数
3. 函数的原型上定义了一个 `apply` 方法，方法注入了 `compiler` 对象作为参数
4. `apply` 方法中通过调用 `compiler` 对象挂载 webpack 事件钩子，钩子回调中能拿到当前编译 `compilation` 对象，如果是异步编译插件则拿到回调 callback.
5. 完成自定义编译流程，处理 compiltion 对象的内部数据
6. 如果是异步插件，则数据处理完后执行 callback 回调


## 以 test-webpack-plugin 为例

写法：

```js
// es5
var pluginName = 'test-webpack-plugin'
function TestWebpackPlugin (opt) {
	this.options = opt
}
TestWebpackPlugin.prototype.apply = function (compiler) {
	if (compiler.hooks) { // webpack4 +
    	compiler.hooks.emit.tapAsync(pluginName, function (compilation, callback) {
        	// ...
          callback()
        })
    } else {
    	compiler.plugin('emit', function (compilation, callback) {
        	// ...
            callback()
        })
    }
}

// es6
const pluginName = 'test-webpack-plugin'
class TestWebpackPlugin {
	constructor (opt) {
    	this.options = opt
    }
    apply (compiler) {
    	const { hooks } = compiler
        if (hooks) {
        	hooks.emit.tapAsync(pluginName, (compilation, callback) => {})
        } else {
        	compiler.plugin('emit', (compilation, callback) => {})
        }
    }
}
```

## Compiler 与 Compilation

1. Compiler 对象包含了 Webpack 环境所有的配置信息；
2. Compilation 对象包含了当前的模块资源、编译生成资源、资源变化的文件等；
3. Compiler 与 Compilation 的区别在于：Compiler 代表了整个 Webpack 从启动到关闭的生命周期，而 Compilation 只代表了一次新的编译；

* [Compiler](https://github.com/webpack/webpack/blob/main/lib/Compiler.js)

Compiler 对象是 webpack 的编译器对象，Compiler 对象会在启动 webpack 的时候被一次性的初始化，Compiler 对象中包含了所有 webpack 可自定义操作的配置，例如 loader 的配置，plugin 的配置，entry 的配置等各种原始 webpack 配置等


* [Compilation](https://github.com/webpack/webpack/blob/main/lib/Compilation.js)

compilation 实例继承于 compiler，compilation 对象代表了一次单一的版本 webpack 构建和生成编译资源的过程。当运行 webpack 开发环境中间件时，每当检测到一个文件变化，一次新的编译将被创建，从而生成一组新的编译资源以及新的 compilation 对象。一个 compilation 对象包含了 当前的模块资源、编译生成资源、变化的文件、以及 被跟踪依赖的状态信息。编译对象也提供了很多关键点回调供插件做自定义处理时选择使用。

## webpack插件机制

Webpack 通过 Plugin 机制让其更加灵活，以适应各种应用场景。 在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果，compiler.plugin(事件名称, 回调函数)，compiler.hooks.someHook.tap(...)，而这样的插件机制源于 `Tapable` 库

* [Tapable](https://github.com/webpack/tapable)

webpack 的插件架构主要基于 Tapable 实现的，Tapable 是 webpack 项目组的一个内部库，主要是抽象了一套插件机制。

```js
const {
	SyncHook, // 同步串行钩子，在触发事件之后，会按照事件注册的先后顺序执行所有的事件处理函数
	SyncBailHook, // 同步保险钩子，如果事件处理函数执行时有一个返回值不为空。则跳过剩下未执行的事件处理函数
	SyncWaterfallHook, // 同步瀑布流钩子，上一个事件处理函数的返回值作为参数传递给下一个事件处理函数，依次类推
	SyncLoopHook, // 同步循环钩子，事件处理函数返回true表示继续循环，如果返回undefined的话，表示结束循环
	AsyncParallelHook, // 异步并行钩子
	AsyncParallelBailHook, // 异步并行保险钩子
	AsyncSeriesHook, // 异步串行钩子
	AsyncSeriesBailHook, // 异步串行保险钩子
	AsyncSeriesWaterfallHook // 异步串行瀑布流钩子
 } = require('tapable')
```

## Compiler 事件钩子

| 事件钩子 | 触发时机 | 参数 | 类型 |
| -- | -- | -- | -- |
| entryOption | 在 entry 配置项处理过之后，执行插件 | - | SyncBailHook 同步保险 |
| run | 开始读取 records 之前，钩入(hook into) compiler | compiler | AsyncSeriesHook 异步串行 |
| compile | 一个新的编译(compilation)创建之后，钩入(hook into) compiler | compilationParams | 	SyncHook 同步 |
| compilation | 编译(compilation)创建之后，执行插件 | compilation | 	SyncHook 同步 |
| make | 从 entry 开始递归分析依赖，准备对每个模块进行 build | compilation | AsyncParallelHook 异步并行 |
| after-compile | 编译 build 过程结束 | compilation | AsyncSeriesHook 异步串行 |
| emit | 生成资源到 output 目录之前 | compilation | AsyncSeriesHook 异步串行 |
| after-emit | 生成资源到 output 目录之后 | compilation | AsyncSeriesHook 异步串行 |
| done | 编译(compilation)完成 | stats | SyncHook 同步 |

## 示例

目录 plugins/fileListPlugin

npm run build 时，在dist目录下生成 config.json 文件 将getListTask返回的数据插入其中