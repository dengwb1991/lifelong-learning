# 000_test-examples

webpack开发测试示例

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## 问题处理记录

1. eslint: error Parsing error: The keyword 'const' is reserved

```json
// .eslintrc
{
    "parserOptions": {
        "ecmaVersion": 2017
    },
    "env": {
        "es6": true
    }
}
```

[参考](https://stackoverflow.com/questions/42706584/eslint-error-parsing-error-the-keyword-const-is-reserved)