const { requiredOption } = require('commander')
const { promisify } = require('util')
/**
 * clone project
 * @param {*} repo github 地址 
 * @param {*} desc 文件名
 */
module.exports.clone = async function (repo, desc) {
  const download = promisify(require('download-git-repo'))
  const ora = require('ora')
  const process = ora(`download...${repo}`)
  process.start()
  await download(repo, desc)
  process.succeed()
}