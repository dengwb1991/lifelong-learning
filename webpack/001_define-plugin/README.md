# DefinePlugin

条件编译（一）

[define-plugin | cn](https://www.webpackjs.com/plugins/define-plugin/)
[define-plugin | en](https://webpack.js.org/plugins/define-plugin/)

允许创建一个在编译时可以配置的全局常量。这可能会对开发模式和发布模式的构建允许不同的行为非常有用。如果在开发构建中，而不在发布构建中执行日志记录，则可以使用全局常量来决定是否记录日志。

## 使用方法

```js
// webpack
plugins: [
  new webpack.DefinePlugin({
    PRODUCTION: JSON.stringify(true),
    VERSION: JSON.stringify("5fa3b9"),
    BROWSER_SUPPORTS_HTML5: true,
    TWO: "1+1",
    "typeof window": JSON.stringify("object")
  })
]

// ---
console.log("Running App version " + VERSION);
if(!BROWSER_SUPPORTS_HTML5) require("html5shiv");


// index.js
if (!PRODUCTION) {
  console.log('Debug info')
}

if (PRODUCTION) {
  console.log('Production log')
}

// 打包后 会删除 console.log('Debug info')
console.log('Production log')
```

## 解决 EsLint 报错

三种方式：

1. 在 `rules` 添加 `no_undef: warn`

```js
// .eslintrc.js

"extends": "eslint:recommended",
"rules": {
  "no-undef": "warn"
}
```

2. 代码中标记忽略

```js
/*eslint-disable no-undef */
if (!PRODUCTION) {
  console.log('Debug info')
}
if (PRODUCTION) {
  console.log('Production log')
}
/*eslint-enable no-undef */
```

3. 配置全局变量

```js
// .eslintrc.js
globals: {
  "PRODUCTION": false
}
```