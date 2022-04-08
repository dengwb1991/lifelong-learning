# 自定义loader 实现多态引入文件

## 需求

实现一个自定义loader，可根据mode参数来区分代码中引入哪个文件.

```js
rules: [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: [{
      loader: 'ploy-loader',
      options: {
        mode: 'production'
      }
    }]
  }
]
```

```js
import event from './interface/event.[mode].js'
```

## 实现方案

1. 获取文件内容，匹配出引入文件语法 如：import from
2. 获取匹配引入路径，并遍历该文件夹内是否含有该多态的文件
3. 若含有则替换原文件内容