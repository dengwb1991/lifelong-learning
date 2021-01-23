const { promisify } = require('util')
const figlet = promisify(require('figlet'))

const clear = require('clear')
const chalk = require('chalk') // 变色
const log = content => console.log(chalk.white(content))
const { clone } = require('./download.js')

// 异步函数
const spawn = async (...args) => {
  const { spawn } = require('child_process')
  return new Promise((resolve) => {
    const proc = spawn(...args)
    proc.stdout.pipe(process.stdout)
    proc.stderr.pipe(process.stderr)
    proc.on('close', () => {
      resolve()
    })
  })
}

module.exports = async name => {
  // 欢迎界面
  clear()
  const data = await figlet('Weclome!!')
  log(data)

  // clone
  // log(`🚀创建项目 ${name}`)
  // await clone('github:su37josephxia/vue-template', name)

  // 自动安装依赖
  log(`🔨安装依赖 ${name}`)
  // await spawn('yarn', ['--registry=https://registry.npmjs.org'], { cwd: `./${name}`})
  // await spawn('npm', ['install', '--registry=https://registry.npmjs.org'], { cwd: `./${name}`})
  await spawn('cnpm', ['install'], { cwd: `./${name}`})
  log(`👌完成`)

  // 启动项目
  await spawn('npm', ['run', 'serve'], { cwd: `./${name}` })
}