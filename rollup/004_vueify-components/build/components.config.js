const path = require('path')
const glob = require('glob')
const compiler = require('vueify').compiler
const bluebird = require('bluebird')
const fs = bluebird.promisifyAll(require('fs')) // http://bluebirdjs.com/docs/api/promise.promisifyall.html
const copy = require('recursive-copy')
const stylus = require('stylus')
const babel = bluebird.promisifyAll(require('babel-core'))
const postcss = require('postcss') // 配置 postcss.config.js
const findPostcssConfig = require('postcss-load-config')

const SRC_BASE = 'src/components'
const TARGET_LIB_BASE = 'lib'

/**
 * 复制目录
 * 将 src/components 复制到 lib 目录下
 * @param {*} destDir 
 * @returns 
 */
function move (destDir) {
  return new Promise((resolve, reject) => {
    copy(SRC_BASE, destDir, {
      overwrite: true,
      filter: function(item) {
        if (/demo|test/.test(item)) {
          return false
        }
        if (/^.*index.js$/.test(item)) {
          return false
        }
        return true
      }}, function (err, result) {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
  })
}
/**
 * 将 css插入到vue 中
 * @param {*} param0 
 */
function babelPluginInsertCssImportForVue ({ types: t }) {
  function computedSameDirCssPosition(filePath) {
    const filePathParse = path.parse(filePath)
    return `./style/${filePathParse.name}.css`
  }
  const globalCssLiteral = '../_style/common.css'
  return {
    visitor: {
      Program(path, state) {
        const importLiteral = computedSameDirCssPosition(state.opts.filePath)
        path.unshiftContainer('body', t.ImportDeclaration([],t.StringLiteral(importLiteral)))
        path.unshiftContainer('body', t.ImportDeclaration([],t.StringLiteral(globalCssLiteral)))
      }
    }
  }
}
/**
 * 编译js文件
 */
function compileAndReplaceAllJsFile () {
  const fileGlob = `lib/**/*.js`
  const jsFiles = glob.sync(fileGlob)
  return Promise.all(jsFiles.map(compileJsAndReplace)).catch(e => {
    throw e
  })
}
function compileJsAndReplace (filePath) {
  // https://www.babeljs.cn/docs/babel-core seatch [transformFileAsync]
  babel.transformFileAsync(filePath, {
    babelrc: false,
    presets: [
      ['env', {
        'modules': 'umd',
        'targets': {
          'browsers': ['iOS >= 8', 'Android >= 4']
        }
      }],
    ]
  }).then(({ code }) => {
    return fs.writeFileAsync(filePath, code)
  }).catch(error => {
    throw error
  })
}

/**
 * vue中样式到后替换变量及函数
 * @param {*} content 
 * @param {*} cb 
 * @param {*} compiler 
 * @param {*} filePath 
 */
function compileVueStylus (content, cb, compiler, filePath) {
  stylus(content)
    .set('filename', filePath)
    .define('url', stylus.url())
    .import(path.join(__dirname, '../src/components/_style/theme.styl'))
    .render(async (err, css) => {
      if (err) {
        throw err
      }
      const {plugins} = await findPostcssConfig({
        env: process.env.NODE_ENV
      })
      postcss(plugins)
        .process(css, {
          from: undefined
        })
        .then(result => {
          cb(null, result.css)
        })
    })
}
/**
 * 编译公共样式文件
 */
function compileGlobalStylus () {
  const filePath = path.resolve(TARGET_LIB_BASE, '_style/common.styl')
  const targetPath = path.resolve(TARGET_LIB_BASE, '_style/common.css')
  const fileContent = fs.readFileSync(filePath, {
    encoding: 'utf8',
  })
  return compileVueStylus(fileContent, (err, cssContent) => {
    fs.writeFileAsync(targetPath, cssContent)
  })
}
/**
 * 编译vue文件
 */
function compileAndReplaceAllVueFile () {
  const fileGlob = `lib/**/*.vue`
  const jsFiles = glob.sync(fileGlob)
  return Promise.all(jsFiles.map(compileVueAndReplace)).catch(e => {
    throw e
  })
}
function computedCompilerConfig (filePath) {
  return {
    extractCSS: true, // 分离css
    babel: {
      presets: [
        ['env', {
          'modules': 'umd',
          'targets': {
            'browsers': ['iOS >= 8', 'Android >= 4']
          }
        }],
      ],
      plugins: [
        [babelPluginInsertCssImportForVue, {
          filePath,
        }]
      ]
    },
    customCompilers: {
      stylus: compileVueStylus
    }
  }
}
function compileVueAndReplace(filePath) {
  /**
   * 获取样式文件路径 styleDir 如：lib/button/src/style
   * 若不存在则创建
   */
  const styleDir = path.join(path.dirname(filePath), 'style')
  if (!fs.existsSync(styleDir)) {
    fs.mkdirSync(styleDir)
  }
  /**
   * 获取文件名 如：index
   */
  const fileBaseName = path.basename(filePath, '.vue')
  /**
   * 获取样式文件地址 如：lib/button/src/style/index.css
   */
  const cssFilePath = path.join(styleDir, `${fileBaseName}.css`)
  /**
   * 获取js文件地址 如：lib/button/src/index.js
   */
  const jsFilePath = filePath.replace(/\.vue$/, '.js')
  /**
   * 获取.vue文件内容
   */
  const fileContent = fs.readFileSync(filePath, {
    encoding: 'utf8',
  })
  const config = computedCompilerConfig(filePath)
  compiler.applyConfig(config)
  let styleContent = ''
  const styleCb = res => {
    if (res.style) {
      styleContent = res.style
    }
  }
  compiler.on('style', styleCb)
  return new Promise((resolve, reject) => {
    compiler.compile(fileContent, filePath, (err, result) => {
      if (err) {
        reject(err)
      }
      compiler.removeListener('style', styleCb)
      fs.writeFileAsync(jsFilePath, result)
      .then(() => fs.writeFileAsync(cssFilePath, styleContent))
      .then(() => {
        fs.unlinkAsync(filePath)
        resolve()
      })
    })
  })
}

function main () {
  return move('lib')
  .then(() => Promise.all([
    compileAndReplaceAllJsFile(), // 编译js文件
    compileAndReplaceAllVueFile(), // 编译vue文件
    compileGlobalStylus() // 编译公共样式文件
  ]))
}

main()