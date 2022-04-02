# normal loader

```js
rules: [
  {
    test: /\.txt$/i,
    use: ["a-loader", "b-loader", "c-loader"],
  },
],
```

执行顺序 `c-loader`、`b-loader`、`a-loader`

## content 赋值给 module.exports 属性

`loaders/a-loader.js` 中把 `content` 赋值给 `module.exports` 属性是为了可以让 `data.txt` 导出内容

```js
eval("module.exports = '我是一个文档[cLoader->bLoader->aLoader]'\n\n//# sourceURL=webpack:///./src/data.txt?");
```