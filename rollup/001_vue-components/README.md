# rollup 打包 vue 组件

[rollup官网](https://www.rollupjs.com/guide/introduction/)

[vue教程](https://cn.vuejs.org/v2/cookbook/packaging-sfc-for-npm.html)

* 该示例中的rollup、babel 版本配置打包后可以完全转译es6

## rollup 插件

`rollup-plugin-node-resolve`:  rollup 无法识别 node_modules 中的包，帮助 rollup 查找外部模块，然后导入

`rollup-plugin-commonjs`: 将 CommonJS 模块转换为 ES6 供 rollup 处理

`rollup-plugin-babel`: ES6 转 ES5，让我们可以使用 ES6 新特性来编写代码

`rollup-plugin-terser`: 压缩 js 代码，包括 ES6 代码压缩

`rollup-plugin-eslint`: js代码检测

`rollup-plugin-require-context`: 使用 require.context 语法

## 全局安装 rollup

```bash
$ npm install rollup -g
```

## 安装插件

有些 rollup 插件需安装新版本的（如 babel，commonjs等），则应该安装 @rollup/ 命名开头的插件。

```bash
$ yarn add @babel/core rollup rollup-plugin-node-resolve rollup-plugin-terser @rollup/plugin-babel @rollup/plugin-commonjs
```

打包文件包含 vue，scss，image 这些类型的文件，则还需要安装 rollup 相关的插件，否则 rollup 无法识别这些文件类型或者是其语法。

```bash
$ yarn add @rollup/plugin-image rollup-plugin-scss rollup-plugin-vue @vue/compiler-sfc
```

注意 rollup-plugin-vue 版本

用到 sass 还需要安装 sass，sass-loader，node-sass 插件

```bash
$ yarn add node-sass sass sass-loader
```

## 创建 rollup 配置文件

```js
// rollup.config.js

import resolve from "rollup-plugin-node-resolve"
import vue from "rollup-plugin-vue"
import babel from "@rollup/plugin-babel"
import commonjs from "@rollup/plugin-commonjs"
import image from "@rollup/plugin-image"

const config = {
  input: "./index.js", // 必须，入口文件
  output: { // 必须，输出文件 (如果要输出多个，可以是一个数组)
    exports: "named", // 输出多个文件
    globals: {
      vue: "Vue" // 告诉rollup全局变量Vue即是vue
    }
  },
  plugins: [ // 引入的插件在这里配置
    resolve(),
    vue({
      css: true,
      compileTemplate: true
    }),
    babel({
      exclude: "**/node_modules/**"
    }),
    commonjs(),
    image()
  ]
}

export default config
```

### external配置

我们在自己的库中需要使用第三方库，例如 lodash 等，又不想在最终生成的打包文件中出现 lodash，这个时候我们就需要使用 external 属性。可根据实际情况自行选择。

```js
external:['lodash'] //告诉rollup不要将此lodash打包，而作为外部依赖
```

external 可跟 globals 配套使用，如 react-redux 开源项目的 rollup 配置文件片段

```js
// rollup.config.js

  ...
  input: 'src/index.js',
  external: ['react', 'redux'],  // 告诉rollup，不打包react,redux;将其视为外部依赖
  output: { 
    format: 'umd', // 输出 ＵＭＤ格式，各种模块规范通用
    name: 'ReactRedux',　// 打包后的全局变量，如浏览器端 window.ReactRedux　
    globals: {
      react: 'React',  // 跟external 配套使用，指明global.React即是外部依赖react
      redux: 'Redux'
    }
  },
```

### jsx 配置

有用到 jsx 语法，则还需增加插件，否则会无法识别 jsx 语法

```bash
$ yarn add @vue/babel-preset-jsx
```

```js
// rollup.config.js

  babel({
    presets: ["@vue/babel-preset-jsx"]
  })
```

