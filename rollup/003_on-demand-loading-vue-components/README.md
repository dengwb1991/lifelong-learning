# vue组件按需加载

## 介绍

将组件拆分为单独的文件.

|____index.cjs.js
|____index.esm.js
|____index.umd.js
|____button
| |____index.js
| |____style
| | |____index.css
|____text
| |____index.js
| |____style
| | |____index.css

## 按需加载引入使用

1. 对项目进行打包、link 

```bash
$ npm run build && npm link
```

2. 在使用的项目中引入

```bash
$ npm link d-component
```

```js
// main.js
import { Button } from 'd-components'
Vue.use(Button)
```

3. 安装 `babel-plugin-component` 插件，配置 `babel.config.js` 文件

```js
module.exports = {
  plugins: [
    [
      "component",
      {
        libraryName: "d-components",
        style: "style/index.css"
      }
    ]
  ]
}
```

若组件样式未单独导出，可以不需要配置 style.

[babel-plugin-component](https://www.npmjs.com/package/babel-plugin-component)