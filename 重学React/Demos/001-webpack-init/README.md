# 简单的 webpack 搭建

重写 createElement 模拟实现 jsx 解析

## 安装 webpack

```
$ yarn add webpack -D
```

webpack 是一个打包工具，可以把多个js文件 打包为一个js文件. 

## 打包

在命令行工具执行 `webpack` 打包后 ，如下

```js
/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./main.js */ \"./main.js\")\n\nconsole.log(123)\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("console.log('main')\n\n//# sourceURL=webpack:///./main.js?");

/***/ })
```

每个文件都会单独用 `eval` 方法执行，`sourceURL` 可以让开发者在浏览器开发者模式找到源文件

## 安装babel

```
$ yarn add @babel/core @babel/preset-env babel-loader -D
```

配置参数可以创建 `.babelrc` 文件或者在 webpack rules 中对应的 loader 配置 `options`.

## 配置 jsx

```
$ yarn add @babel/plugin-transform-react-jsx -D
```

module 配置如下：

```js
module: {
  rules: [
    {
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: [[
            '@babel/plugin-transform-react-jsx',
            { pragma: 'OwlReact.createElement' }
          ]]
        }
      }
    }
  ]
}
```

注意：plugin-transform-react-jsx 的 `pragma` 默认使用 `React.createElement` 编译，若想使用自己的编译插件进行编译，就需要重新定义 `pragma`

## 编写 jsx 语法

```js
import { OwlReact } from './OwlReact.js'

let a = <div id="id">
  <span>Hello </span>
  <span>World!</span>
</div>


document.body.appendChild(a)
```

在 index.js 中创建 `a` DOM元素，它会经过 OwlReact 进行编译，这里由 一个`div`和两个`span`标签组成，所以会经过**三次**.

最终生成的代码如下：

```js
var a = OwlReact.createElement("div", {
  id: "id"
}, 
OwlReact.createElement("span", null, "Hello "), 
OwlReact.createElement("span", null, "World!"));
document.body.appendChild(a);
```


## 编写 OwlReact

```js
export let OwlReact = {
  createElement (type, attributes, ...children) {

    let element = document.createElement(type)

    for (let name in attributes) {
      element.setAttribute(name, attributes[name])
    }

    for (let child of children) {
      if (typeof child === 'string') {
        child = document.createTextNode(child)
      }
      element.appendChild(child)
    }
    return element
  }
}
```

1. 根据 `type` 类型创建 DOM 元素
2. 获取所有的属性进行遍历 重新绑定到 DOM 元素上
3. 添加子元素 children 为数组，child 可能为 dom 或者是文本 这里可以使用 typeof 进行判断

