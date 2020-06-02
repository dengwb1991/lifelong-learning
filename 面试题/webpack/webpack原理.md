## 一、webpack原理及流程

https://juejin.im/entry/5b0e3eba5188251534379615  深入浅出 webpack

1. **初始化** 读取与合并配置参数，加载 Plugin，实例化 Compiler

启动构建，从配置文件和 Shell 语句中读取与合并参数，得出最终的参数。这个过程中还会执行配置文件中的插件实例化语句 new Plugin()。

用上一步得到的参数初始化 Compiler 实例，Compiler 负责文件监听和启动编译。Compiler 实例中包含了完整的 Webpack 配置，全局只有一个 Compiler 实例。

依次调用插件的 apply 方法，让插件可以监听后续的所有事件节点。同时给插件传入 compiler 实例的引用，以方便插件通过 compiler 调用 Webpack 提供的 API。

2. **编译** entry 每个 Module 串行调用对应的 Loader 去翻译文件内容, 再找 Module 依赖的 Module, 递归地进行编译处理. 

执行对象的 `run` 方法开始执行编译

当 Webpack 以开发模式运行时，每当检测到文件变化，一次新的 Compilation 将被创建。一个 Compilation 对象包含了当前的模块资源、编译生成资源、变化的文件等。Compilation 对象也提供了很多事件回调供插件做扩展。

一个新的 Compilation 创建完毕，即将从 Entry 开始读取文件，根据文件类型和配置的 Loader 对文件进行编译，编译完后再找出该文件依赖的文件，递归的编译和解析。

3. **输出** 对编译后的 Module 组合成 Chunk，把 Chunk 转换成文件，输出到文件系统。

根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；

在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。

## 二、HMR原理

https://segmentfault.com/a/1190000020310371#item-4

Server端使用webpack-dev-server去启动本地服务，内部实现主要使用了webpack、express、websocket。

1. 使用express启动本地服务，当浏览器访问资源时对此做响应。
2. 服务端和客户端使用websocket实现长连接
3. webpack监听源文件的变化，即当开发者保存文件时触发webpack的重新编译。
   1) 每次编译都会生成hash值、已改动模块的json文件、已改动模块代码的js文件
   2) 编译完成后通过socket向客户端推送当前编译的hash戳
4. 客户端的websocket监听到有文件改动推送过来的hash戳，会和上一次对比
   1) 一致则走缓存
   2) 不一致则通过ajax和jsonp向服务端获取最新资源
5. 使用内存文件系统去替换有修改的内容实现局部刷新