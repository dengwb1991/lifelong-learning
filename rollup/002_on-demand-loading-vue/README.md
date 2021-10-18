# vue组件按需加载

## rollup 安装使用

```bash
$ npm i rollup -g

// or

$ npm i rollup -D
```

如果是全局安装，直接在项目根目录下执行：

```bash
$ rollup -i src/index.js -o dist/bundle.js -f es
```

在这段指令中：

1. `-i` 指定要打包的文件，`-i`是 `--input` 的缩写;
2. `src/index.js` 是 `-i` 的参数，即打包入口文件;
3. `-o` 指定输出的文件，是 `--output.file` 或 `--file` 的缩写。(如果没有这个参数，则直接输出到控制台);
4. `dist/bundle.js` 是 `-o` 的参数，即输出文件;
5. `-f` 指定打包文件的格式，`-f`是 `--format` 的缩写;
6. `es`是 `-f` 的参数，表示打包文件使用ES6模块规范;


rollup 支持的打包文件的格式有 `amd`、`cjs`、`es\esm`、`iife`、`umd` 五种；

1. amd 为 AMD 标准；
2. cjs 为 CommonJS 标准；
3. es\esm 为 ES模块标准；
4. iife 为立即调用函数；
5. umd 同时支持 AMD、CommonJS 和 iife

## rollup 配置文件

```js
export default {
  input: "./src/index.js",
  output: [
    {
      file: './dist/my-lib-umd.js',
      format: 'umd',
      name: 'myLib'   
      //当入口文件有export时，'umd'格式必须指定name
      //这样，在通过<script>标签引入时，才能通过name访问到export的内容。
    },
    {
      file: './dist/my-lib-es.js',
      format: 'es'
    },
    {
      file: './dist/my-lib-cjs.js',
      format: 'cjs'
    }
  ]
}
```

```js
//修改package.json的script字段

"dev": "rollup -c"                 // 默认使用rollup.config.js
"dev": "rollup -c my.config.js"    // 使用自定义的配置文件，my.config.js
```

## rollup 插件

### @rollup/plugin-babel

`@rollup/plugin-babel` 用于转换 es6 语法.

#### 安装

```bash
$ npm i @rollup/plugin-babel @babel/core @babel/preset-env -D
```

#### 配置

```js
import babel from '@rollup/plugin-babel'

export default {
  plugins:[
    babel({
        exclude: '**/node_modules/**'
    })
  ]
}
```

在项目根目录创建 `.babelrc` 文件

```
{
  "presets": [
      [
        "@babel/preset-env"
      ]
    ]
}
```

### @rollup/plugin-commonjs

`@rollup/plugin-commonjs` 将 CommonJS 模块转换为 ES6 供 rollup 处理

rollup 默认是不支持 CommonJS 模块，有些外部库是使用 cjs 或者 umd 进行打包，使用这些库时需要支持 CommonJS 模块.

例如：

新建 `src/commonjs.js` 文件如下：

```js
module.exports = {
  a: 1
}
```

在 `src/index.js` 中引入如下：

```js
import common from './commonjs.js'

console.log('commonJs::', common.a)
```

`npm run build` 打包会报错：

```bash
[!] Error: 'default' is not exported by src/commonjs.js, imported by src/index.js
https://rollupjs.org/guide/en/#error-name-is-not-exported-by-module
```

#### 安装

```bash
$ npm i @rollup/plugin-commonjs -D
```

#### 配置

```js
import commonjs from "@rollup/plugin-commonjs"

export default {
  plugins:[
    commonjs()
  ]
}
```

### rollup-plugin-postcss

`@rollup/plugin-postcss` 支持 css 文件加载、压缩、添加前缀以及对 scss/less 的支持等. 例如使用 less 时，需要先安装 less.

#### 安装

```bash
$ npm i rollup-plugin-postcss postcss -D
```

#### 配置

```js
import postcss from "rollup-plugin-postcss"

export default {
  plugins:[
    postcss()
  ]
}
```

#### 示例

```css
/* src/test.css */

body {
  color: orange;
}
```

```js
// src/index.js

import "./src/test.css"
```

打包后 es 模块如下：

```js
function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "body {\n  color: orange;\n}";
styleInject(css_248z);
```

##### CSS 加前缀

使用 `autoprefixer` 插件来给css3的一些属性加前缀，如 -webkit-

**安装**

```bash
$ npm i autoprefixer -D
```

**配置**

```js
import postcss from "rollup-plugin-postcss"
import autoprefixer from 'autoprefixer'

export default {
  plugins:[
    postcss({
      plugins: [  
        autoprefixer()  
      ]
    })
  ]
}
```

* 使用 `autoprefixer` 除了以上配置，还需要配置browserslist，有2种方式，一种是建立.browserslistrc文件，另一种是直接在package.json里面配置，我们在package.json中，添加"browserslist"字段。

```js
"browserslist": [
  "defaults",
  "not ie < 8",
  "last 2 versions",
  "> 1%",
  "iOS 7",
  "last 3 iOS versions"
]
```

##### css压缩

使用 `cssnano`

**安装**

```bash
$ npm i cssnano -D
```

**配置**

```js
import postcss from "rollup-plugin-postcss"
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

export default {
  plugins: [
    postcss({
      plugins: [
        autoprefixer(),
        cssnano()
      ]
    })
  ]
}
```

##### 抽离单独的css文件

`rollup-plugin-postcss` 可配置是否将css单独分离，默认没有 `extract`，css样式生成style标签内联到head中，配置了extract，就会将css抽离成单独的文件。

**配置**

```js
import postcss from "rollup-plugin-postcss"
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

export default {
  plugins: [
    postcss({
      plugins: [
        autoprefixer(),
        cssnano()
      ],
      extract: 'css/index.css'  
    })
  ]
}
```

* 页面需要单独引入打包后的 css 文件

### rollup-plugin-vue

`rollup-plugin-vue` 用于处理.vue文件。vue2和vue3项目所用的 `rollup-plugin-vue` 版本不一样，vue的编译器也不一样。

* vue2：rollup-plugin-vue^5.1.9 + vue-template-compiler
* vue3：rollup-plugin-vue^6.0.0 + @vue/compiler-sfc

以 vue2 为例

#### 安装

```bash
npm i rollup-plugin-vue@5.1.9 vue-template-compiler --D
```

#### 示例

```js
// src/index.js
import Index from './index.vue'

function install (Vue) {
  Vue.component(Index.name, Index)
}

export default install
```

```html
<html>
  <head>
    <title>测试</title>
  </head>
  <body>
    <div id="app">
      <hello></hello>
    </div>
  </body>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script src="./dist/my-lib-umd.js"></script>
  <script>
    Vue.use(myLib)
    new Vue({
      el: '#app'
    })
  </script>
</html>
```

`rollup-plugin-vue` 也是默认支持 scss、less、stylus，可以在项目中直接使用。给.vue文件中的css自动加前缀，需要在 `rollup-plugin-vue` 中配置。更多配置可参考 [rollup-plugin-vue](https://rollup-plugin-vue.vuejs.org/options.html#style-postcssoptions)

```js
import vue from 'rollup-plugin-vue'
import autoprefixer from 'autoprefixer'  //同样要配置browserslist

export default {
  plugins:[
    vue({
      style: {
        postcssPlugins: [
          autoprefixer()
        ]
      }
    })
  ]
}
```

### rollup-plugin-terser

代码压缩插件

#### 配置

```js
import { terser } from 'rollup-plugin-terser'
export default {
  plugins: [
    terser()
  ]
}
```

### rollup-plugin-serve、rollup-plugin-livereload

`rollup-plugin-serve` 负责启动一个服务，`rollup-plugin-livereload` 负责监听文件变化实时更新页面。

#### 配置

```js
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

export default {
  plugins:[
    serve({
      contentBase: '',  // 服务器启动的文件夹，默认是项目根目录，需要在该文件下创建index.html
      port: 8020   // 端口号，默认10001
    }),    
    livereload('dist')   // watch dist目录，当目录中的文件发生变化时，刷新页面
  ]
}
```

修改命令 添加 `-w` 或 `--watch`

```json
{
  "scripts": {
    "dev": "rollup -w -c rollup.config.js",
  }
}
```

## 打包按需加载组件

对于组件库项目，支持按需加载需要满足：**组件库以ES模块化方式导出**

详见配置

```js
// src/index.js
import { transformCamelCase } from './common/util.js'
import Button from './components/button/index.vue'
import Text from './components/text/index.vue'

export const components = {
  Button,
  Text
}

const install = function (Vue) {
  if (!Vue || install.installed) {
    return
  }

  const componentsNames = Object.keys(components)
  componentsNames.forEach(name => {
    const component = components[name]
    if (component.name) {
      Vue.component(component.name, component) // kebab-case
      Vue.component(transformCamelCase(`-${component.name}`), component) // PascalCase
    }
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  install,
  Button,
  Text
}

export default {
  install
}
```

```js
// rollup.config.js
import babel from "@rollup/plugin-babel"
import commonjs from "@rollup/plugin-commonjs"
import autoprefixer from 'autoprefixer'
import vue from 'rollup-plugin-vue'

const postcssPlugins = [autoprefixer()]

const plugins = [
  vue({
    css: false,
    style: {
      trim: false,
      postcssPlugins
    }
  }),
  babel({
      exclude: '**/node_modules/**'
  }),
  commonjs()
]

export default {
  input: "./src/index.js",
  output: [
    {
      file: './dist/my-lib-umd.js',
      format: 'umd',
      name: 'myLib'
    },
    {
      file: './dist/my-lib-es.js',
      format: 'es'
    },
    {
      file: './dist/my-lib-cjs.js',
      format: 'cjs'
    }
  ],
  plugins,
}
```

```json
// package.json
{
  "main": "dist/my-lib-cjs.js",
  "module": "dist/my-lib-es.js",
}
```

* 对比 webpack，`rollup` 按需加载组件不需要借助插件