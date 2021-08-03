const jscc = require('jscc')
const loaderUtils = require('loader-utils')

module.exports = function(
  source,
  inputSourceMap,
  meta,
) {
  const options = loaderUtils.getOptions(this) || {
    values: {},
  }

  const out = jscc(source, this.resourcePath, {
    values: options.values,
  })
  /**
   * 可以在 out.code 使用replace(/name/g, '') 替换
   */
  this.callback(null, out.code, out.map, meta)
}
