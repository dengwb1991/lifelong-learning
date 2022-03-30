const fs = require("fs")

/**
 * 获取文件夹下所有文件名
 * @param {*} filePath 文件夹路径 
 * @returns 
 */
const genFileList = (filePath) => {
  let filesList = []
  
  files = fs.readdirSync(filePath); // 需要用到同步读取
  files.forEach((file) => {
    let states = fs.statSync(filePath + '/' + file)
    // 判断是否是目录，是就继续递归
    if (states.isDirectory()) {
      genFileList(filePath + '/' + file, filesList)
    } else {
      // 不是就将文件push进数组，此处可以正则匹配是否是 .js 先忽略
      filesList.push(file)
    }
  })
  return filesList
}

/**
 * 组合多态文件名
 * text.js ===> text.[mode].js
 * @param {*} path 
 * @param {*} mode 
 */
const getModeFileName = (path, mode) => {
  let reg = /([^\\/]+)\.([^\\/]+)/i
  let modeFileName = null
  path.replace(reg, ($1, $2, $3) => {
    modeFileName = $2 + '.' + mode + '.' + $3
  })
  return modeFileName
}

/**
 * 匹配符合 文件路径的 多态文件
 * home/index.js  ===>  home/index.production.js
 * @param {*} path 文件路径 
 * @param {*} mode 多态
 */
const getModePath = (path, mode) => {
  let index = path.lastIndexOf('/')
  let filePath = path.substring(0, index)
  let fileName = path.substring(index + 1)
  const fileList = genFileList(filePath)
  const modeFileName = getModeFileName(path, mode)
  if (fileList.indexOf(modeFileName) > -1) {
    return filePath + '/' + modeFileName
  } else {
    return path
  }
}

module.exports = {
  getModePath
}
