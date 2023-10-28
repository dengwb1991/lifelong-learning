
/**
 * 本测试用于 express 程序启动测试
 * 单元测试参考：*.test.ts
 */
import * as express from 'express'
// const createController = require('../dist/index')
import createController from '../src'
import * as path from 'path'


const app = express()



const application = createController({
  root: path.resolve('./tests/routes'),
  app,
  pathMode: 'hyphenate',
})

application.on('mounted', routes => {
  console.log('owl controller mounted')
  console.log(routes.map((r: any) => r.path))
})

application.before(function () {
  return this.req.query
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
