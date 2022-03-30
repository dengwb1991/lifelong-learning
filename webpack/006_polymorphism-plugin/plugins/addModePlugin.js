const ConcatSource = require('webpack-sources').ConcatSource;

class CustomPlugin {
  constructor () {
  }
  apply (compiler) {
    compiler.hooks.compilation.tap('CustomPlugin', (compilation) => {
      compilation.hooks.optimizeChunkAssets.tapAsync('CustomPlugin', (chunks, callback) => {
        chunks.forEach((chunk) => {
          chunk.files.forEach((fileName) => {
            // 判断具体要修改的文件，假设简单通过 chunk 的文件名称判断入口
            if (fileName.indexOf('app') > -1) {
              // const contents = compilation.assets[fileName].source()
              // const withoutComments = contents.replace('./src/mode/event.development.js', './mode/event.development.js')
              // compilation.assets[fileName] = {
              //     source: () => withoutComments,
              //     size: () => withoutComments.length
              // }
              // 在源码头尾各增加内容
              compilation.assets[fileName] = new ConcatSource(
                `console.log(123);`,
                compilation.assets[fileName],
                `console.log(234);`,
              );
            }
          })
        })
        callback()
      })
    })
  }
}

module.exports = CustomPlugin