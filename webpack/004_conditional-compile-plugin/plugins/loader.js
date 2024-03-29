const jscc = require('jscc')
const loaderUtils = require('loader-utils')

module.exports = function(
  source,
  inputSourceMap,
  meta,
) {
  /**
   * loaderUtils.getOptions(this) 为定义的参数:  { values: { _ENV: 'wx' } }
   */
  const options = loaderUtils.getOptions(this) || {
    values: {},
  }
  /**
   * this.resourcePath 为引入业务代码全路径
   * source 为 this.resourcePath 路径中的代码
   */
  const out = jscc(source, this.resourcePath, {
    values: options.values,
  })
  /**
   * 可以在 out.code 使用replace(/name/g, '') 替换
   */
  this.callback(null, out.code, out.map, meta)
}
