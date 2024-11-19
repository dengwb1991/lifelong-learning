# 使用babel编译示例

通过 babel 编译 JS 代码.

* Babel本身并不能实现完全的Tree Shaking，因为它只是一个JavaScript编译器，而不是一个模块打包器。完全的Tree Shaking通常需要配合Webpack等模块打包器来使用。


## 教程

1. 安装依赖包

```bash
$ npm install --save-dev @babel/core@7.23.2 @babel/preset-env@7.23.2 @babel/cli@7.23.0
```

@babel/core 是 Babel 的核心库。
@babel/preset-env 是一个预设，它允许你根据目标环境自动选择所需的 Babel 插件。
@babel/cli 执行 babel 命令

2. 创建 Babel 配置文件

在项目根目录下创建一个 .babelrc 文件，或者在 package.json 中添加一个 Babel 配置：

```js
{
  "presets": ["@babel/preset-env"]
}
```

这个配置会告诉 Babel 使用 @babel/preset-env 预设来根据目标环境进行转译。

3. 创建你的 JavaScript 代码

在项目目录中创建你的 JavaScript 文件，例如 index.js，然后写入你的代码。

4. 编译代码

使用 Babel 来编译你的代码。你可以使用命令行或者集成到构建工具中。如果你想在命令行中编译，可以使用以下命令：

```js
"scripts": {
  "build": "babel src/index.js --out-dir dist"
}
```

5. 打包

Babel 本身并不提供将多个 JavaScript 文件编译成一个文件的功能。这通常由构建工具（如 Webpack、Rollup、Parcel 等）来处理，这些构建工具可以整合多个 JavaScript 文件并将它们打包成一个文件。

如果你的项目需要打包成一个单一的文件，你可以使用工具如 Webpack 或 Rollup 来完成这个任务。这些工具可以将多个模块打包成一个或多个输出文件，以满足不同环境的需求。在这里，需要使用 Webpack：

```bash
$ npm install --save-dev webpack webpack-cli babel-loader
```

创建一个 Webpack 配置文件（例如 webpack.config.js）：

```js
const path = require('path');

module.exports = {
  entry: './src/index.js', // 入口文件
  output: {
    filename: 'bundle.js', // 输出文件名
    path: path.resolve(__dirname, 'dist') // 输出目录
  },
  module: {
    rules: [
      {
        test: /\.js$/, // 匹配 .js 文件
        use: 'babel-loader', // 使用 Babel 进行转译
        exclude: /node_modules/ // 不转译 node_modules 目录下的代码
      }
    ]
  }
};
```

修改命令

```js
"scripts": {
  "build": "webpack --mode=production --config ./webpack.config.js"
}
```