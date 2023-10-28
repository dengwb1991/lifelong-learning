import * as express from 'express'
import * as request from 'supertest'
import * as path from 'path'
import createController from '../src'

/**
 * *.test.ts 文件用于单元测试
 * express 应用测试参考 app.ts
 */
describe('owl-controller:app', () => {
  test('no params', done => {
    const app = express()
    const ctr = createController({
      /**
       * 注意这里指定了路径决定了路由生成的根路径
       */
      root: path.resolve('./tests'),
      app,
    })
    request(app).get('/routes/home/test').expect(200, { error: 0, data: { name: 'hhaha' } }, done)
  })
  test('has params', done => {
    const app = express()
    const application = createController({
      root: path.resolve('./tests/routes'),
      app,
    })
    application.before(function () {
      this.injects = { ...this.req.query }
    })
    request(app).get('/home/test?im=UserName').expect(200, { error: 0, data: { im: 'UserName', name: 'hhaha' } }, done)
  })

  // 测试默认路径解析模式
  test('pathMode is normal', done => {
    const app = express()
    const application = createController({
      root: path.resolve('./tests/routes'),
      app,
    })
    request(app).get('/example/deep/fooBar/camelTest').expect(200, { error: 0, data: true }, done)
  })

  // 测试驼峰转 path
  test('pathMode is camelCase', done => {
    const app = express()
    const application = createController({
      root: path.resolve('./tests/routes'),
      app,
      pathMode: 'camelCase',
    })
    request(app).get('/example/deep/foo/bar/camel/test').expect(200, { error: 0, data: true }, done)
  })

  // 测试驼峰转连字符 url
  test('pathMode is hyphenate', done => {
    const app = express()
    createController({
      root: path.resolve('./tests/routes'),
      app,
      pathMode: 'hyphenate',
    })
    request(app).get('/example/deep/foo-bar/camel-test').expect(200, { error: 0, data: true }, done)
  })

  // 用户自定义解析模式
  test('pathMode is custom function', done => {
    const app = express()
    createController({
      root: path.resolve('./tests/routes'),
      app,
      pathMode: (str: string) => str,
    })
    request(app).get('/example/deep/fooBar/camelTest').expect(200, { error: 0, data: true }, done)
  })

  // 测试装饰器解析顺序
  test('decorator orders', done => {
    const app = express()
    createController({
      root: path.resolve('./tests/routes'),
      app,
      pathMode: 'camelCase',
    })
    request(app).get('/example/deep/foo/bar/order/test').expect(200, {
      error: 0, data: ['d3', 'd2', 'd1'],
    }, done)
  })

  test('decorator orders, test2', done => {
    const app = express()
    createController({
      root: path.resolve('./tests/routes'),
      app,
      pathMode: 'hyphenate',
    })
    request(app).get('/example/deep/foo-bar/order-test2').expect(200, {
      error: 0, data: ['d1', 'd2', 'd3'],
    }, done)
  })

  test('decorator orders, test3', done => {
    const app = express()
    createController({
      root: path.resolve('./tests/routes'),
      app,
      pathMode: 'hyphenate',
    })
    request(app).get('/example/deep/foo-bar/order-test3').expect(200, {
      error: 0, data: ['d1', 'd2'],
    }, done)
  })
})
