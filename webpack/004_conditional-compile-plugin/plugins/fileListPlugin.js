/**
 * npm run build 时，在dist目录下生成 config.json 文件 将getListTask返回的数据插入其中
 */
const PLUGIN_NAME = 'FileListPlugin'

class FileListPlugin {
  constructor (options) {
    this.options = options
  }

  apply (compiler) {
    const { hooks } = compiler
    if (hooks) {
      hooks.emit.tapAsync(PLUGIN_NAME, (compilation, callback) => {
        // 从服务端获取配置文件
        const getListTask = Promise.resolve(JSON.stringify({
          text: '接口数据'
        }))
        getListTask.then(list => {
          compilation.assets['config.json'] = {
            source: function () {
              return list
            },
            size: function () {
              return list.length
            }
          }
          callback()
        })
      })
    }
  }
}

module.exports = FileListPlugin