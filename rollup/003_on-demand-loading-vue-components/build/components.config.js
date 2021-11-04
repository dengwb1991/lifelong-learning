import plugins from './plugins'
const path = require('path')
const fs = require('fs')

// __dirname 表示当前执行脚本所在的目录 , __filename 表示当前正在执行的脚本的文件名

// 获取当前文件夹下所有子文件夹名称 如 d-button
let componentFileNames = []
const files = fs.readdirSync(path.join(__dirname, '../src/components'))
files.forEach(function (file) {
  const stat = fs.lstatSync(path.join(__dirname, `../src/components/${file}`))
  // 判断是否是文件夹
  if (stat.isDirectory()) {
    componentFileNames.push(file)
  }
})

// 单组件分别打包配置
const config = componentFileNames.map(function (item) {
  return {
    input: `src/components/${item}/index.js`,
    output: [{
      file: `lib/${item}/index.js`,
      format: 'umd',
      name: item
    }],
    plugins: [
      ...plugins({
        postcss: {
          extract: `style/index.css`
        }
      })
    ],
    external: ['vue']
  }
})

export default config