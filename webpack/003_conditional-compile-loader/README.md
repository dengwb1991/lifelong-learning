# js-conditional-compile-loader

条件编译（二）

[compile-loader](https://github.com/hzsrc/js-conditional-compile-loader)

## 安装

```bash
$ npm i -D js-conditional-compile-loader
```

## 使用

```js
// webpack.base.config.js

const conditionalCompiler = {
  loader: 'js-conditional-compile-loader',
  options: {
      isDebug: process.env.NODE_ENV === 'development', // optional, this expression is default
      envTest: process.env.ENV_CONFIG === 'test', // any prop name you want, used for /* IFTRUE_evnTest ...js code... FITRUE_evnTest */
      myFlag: process.env.npm_config_myflag, // enabled when running command: `npm run build --myflag`
  }
}

...
  module: {
    rules: [
      {
        test: /\.js$/i,
        use: [conditionalCompiler],
        exclude: /node_modules/
      }
    ]
  },
...
```

```js
/* IFTRUE_envTest */
console.log('1234')
/* FITRUE_envTest */
```

```js
"scripts": {
  ...
  "build": "webpack --mode=production --config ./build/webpack.config.js",
  "test": "cross-env ENV_CONFIG=test webpack --mode=production --config ./build/webpack.config.js"
},
```

执行 `npm run test` 则保留 `console`.