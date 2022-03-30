const jscc = require('jscc')
const loaderUtils = require('loader-utils')
const { getModePath } = require('./utils')

module.exports = function(
  source,
  inputSourceMap,
  meta,
) {

  const options = loaderUtils.getOptions(this) || {
    values: {},
  }
  console.log('::::',this.resourcePath)
  const resourcePath = getModePath(this.resourcePath, options.env)
  console.log('resourcePath::', resourcePath)
  const out = jscc(source, resourcePath, {
    values: {},
  })
  /**
   * 可以在 out.code 使用replace(/name/g, '') 替换
   */
  this.callback(null, out.code, out.map, meta)
}
