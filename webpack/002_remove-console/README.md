# 删除log

[terser-webpack-plugin](https://www.npmjs.com/package/terser-webpack-plugin)

## 安装使用

```bash
$ npm install terser-webpack-plugin@4.2.3 --save-dev
```

```js
// webpack.prod.config.js
const TerserPlugin = require('terser-webpack-plugin')

const terserPlugin = new TerserPlugin({
  cache: true,
  parallel: true,
  extractComments: true,
  terserOptions: {
    compress: {
      warnings: false,
      drop_console: true,
      drop_debugger: true,
      pure_funcs: ['console.log'] //移除console.log函数
    }
  }
})

module.exports = {
  optimization: {
    minimize: true,
    minimizer: [terserPlugin]
  },
}
```


## FAQ

1. 提示错误

```bash
const hooks = compiler.webpack.javascript.JavascriptModulesPlugin.getCompilationHooks(compilation);
                                     ^
TypeError: Cannot read property 'javascript' of undefined
```

确认安装版本，
`webpack@4.x.x` 对应的 `terser-webpack-plugin@4.x.x` 版本
`webpack@5.x.x` 对应的 `terser-webpack-plugin@5.x.x` 版本

https://github.com/webpack-contrib/terser-webpack-plugin/issues/342