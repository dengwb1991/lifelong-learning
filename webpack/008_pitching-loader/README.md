# pitch loader

```js
rules: [
  {
    test: /\.txt$/i,
    use: ["a-loader", "b-loader", "c-loader"],
  },
],
```

1. 与 normal-loader 不同点是 `pitch` 执行顺序与其相反
执行顺序 `a-loader`、`b-loader`、`c-loader`
2. 当某个 `Pitching Loader` 返回非 undefined 值时，就会实现熔断效果，跳过剩下的loader

