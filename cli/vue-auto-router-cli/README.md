# 完成一个Cli

https://www.processon.com/view/link/5e89ab04e4b0a1e6dcb47e67
## 创建环境

```bash

$ mkdir vue-auto-router-cli

$ cd vue-auto-router-cli

$ npm init -y

$ npm i commander download-git-repo ora handlebars figlet clear chalk open watch -S --registry "https://registry.npmjs.org/"
```

指定解释器 为 `node`
```js
#!/usr/bin/env node
```

执行 npm link
```bash
➜  vue-auto-router-cli git:(master) ✗ npm link
npm WARN vue-auto-router-cli@1.0.0 No description
npm WARN vue-auto-router-cli@1.0.0 No repository field.

up to date in 0.596s

14 packages are looking for funding
  run `npm fund` for details

/usr/local/bin/dengwb -> /usr/local/lib/node_modules/vue-auto-router-cli/bin/index.js
/usr/local/lib/node_modules/vue-auto-router-cli -> /Users/didi/MyWorkspaces/lifelong-learning/cli/vue-auto-router-cli
```

### 定制命令行工具

使用 `commander`

```js
#!/usr/bin/env node

const program = require('commander')

program.version(require('../package.json').version)

program
  .command('init <name>')
  .description('init project')
  .action(name => {
    console.log('init ' + name)
  })

program.parse(process.argv)
```

### 实现close install run

安装cnpm
```bash
$ npm install -g cnpm --registry=https://registry.npm.taobao.org
```

1. 通过 `download-git-repo` 库，实现 close 功能
2. 通过 `child_process` 中 `spawn` 函数，执行命令行操作，实现 `npm` or `yarn` 等操作.

更多[nodeJs API](http://nodejs.cn/api/)

### 约定路由

```bash
$ dengwb refresh
```

定义 `.hbs` 模板. 通过使用 `handlebars` 模板库，将字段插入至模板内并创建.

核心代码 `lib/refresh.js`

1. 通过 fs 读取文件列表
2. 对预制的`.hbs`模板生成代码文件

