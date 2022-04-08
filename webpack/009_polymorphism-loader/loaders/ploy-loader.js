const loaderUtils = require('loader-utils')
const utils = require('./utils')

/**
 * 返回处理后的文件源
 * @param {*} source 文件源 
 * @returns {string} 处理后的文件源
 */
function getResource (source) {
  const options = loaderUtils.getOptions(this) || {}
  let resource = source
  let requireFileStatements = source.match(utils.REG.matchRequireStatements)
  if (requireFileStatements) {
    for (let i = 0, len = requireFileStatements.length; i < len; i++) {
      let requireFilePath = requireFileStatements[i].match(utils.REG.matchRequireFilePath)[0]
      requireFilePath = requireFilePath.substring(1, requireFilePath.length - 1)
      const { fileName, filePath } = utils.getContextData(this.context, requireFilePath)
      const fileList = utils.genFileList(filePath)
      const modeFileName = utils.getModeFileName(fileName, options.mode)
      if (fileList.some(item => item.indexOf(modeFileName) > -1)) {
        let list = requireFilePath.split('/')
        list.pop()
        list.push(modeFileName)
        resource = resource.replace(requireFilePath, list.join('/'))
      }
    }
  }
  return resource
}

module.exports = function(
  source,
  map,
  meta,
) {
  const resource = getResource.apply(this, [source])
  this.callback(null, resource, map, meta)
}