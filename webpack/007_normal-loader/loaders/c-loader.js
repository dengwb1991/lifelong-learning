function cLoader(content, map, meta) {
  console.log("开始执行cLoader Normal Loader")
  return content + "[cLoader->"
}

module.exports = cLoader