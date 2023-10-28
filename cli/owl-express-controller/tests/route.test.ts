import { Route, createRouter } from '../src/route'
import { Application } from '../src/application'
import * as express from 'express'
import { HANDLER_TYPE, TypeHandler } from '../src/decorator'

const createApp = () => {
  const app = new Application({
    app: express(),
  })

  app.before(function (ctx: any) {
    ctx.injects = [this.req.query]
  } as any)
  app.after(function (ctx: any, data: any) {
    return { code: 200, data, message: 'success' }
  } as any)
  return app
}


const noop = () => { }

describe('route', () => {

  test('basic', async () => {
    const app = createApp()
    const route = new Route(app, (query: any) => query)
    const req: any = { query: true }
    const res: any = {}
    const ret = await route.excuteAction(req, res, noop)
    expect(ret).toEqual({
      code: 200, data: true, message: 'success',
    })
  })

  test('new Route', async () => {
    const app = createApp()
    let route = new Route(app, (query: any) => query)
    const configs: Array<{ options: any } & TypeHandler> = [
      {
        options: null,
        type: HANDLER_TYPE.before,
        handler: (ctx: any) => {
          ctx.injects = [{ ...ctx.req.query, before: 1 }]
        },
      },
      {
        options: null,
        type: HANDLER_TYPE.after,
        handler: (ctx: any, result: any) => {
          return { ...result, after: 1 }
        },
      },
    ]
    route = createRouter(configs, route)
    const req: any = { query: { name: 'route' } }
    const res: any = {}
    const ret = await route.excuteAction(req, res, noop)
    expect(ret).toEqual({
      code: 200, data: { name: 'route', after: 1, before: 1 }, message: 'success',
    })
  })

  test('use', async () => {
    const app = createApp()
    const route = new Route(app, (query: any) => query)
    let isUse = false
    const use = (req: any, res: any, next: any) => {
      isUse = true
    }
    route.use(use)
    const routeInfo = route.mount()
    expect(routeInfo.handlers[0]).toEqual(use)
    expect(routeInfo.handlers.length).toBe(2)
    routeInfo.handlers[0]()
    expect(isUse).toBe(true)
  })

  // 测试 context 上下文
  test('context.route', done => {
    const app = createApp()
    let route = new Route(app, (query: any) => query)
    const configs: Array<{ options: any } & TypeHandler> = [
      {
        options: null,
        type: HANDLER_TYPE.before,
        handler: (ctx: any) => {
          done(expect(ctx.route).toEqual(route.toObject()))
        },
      },
      {
        options: null,
        type: HANDLER_TYPE.after,
        handler: (ctx: any, result: any) => {
          return { ...result, after: 1 }
        },
      },
    ]
    route = createRouter(configs, route)
    const req: any = { query: { name: 'route' } }
    const res: any = {}
    route.excuteAction(req, res, noop)
  })



  // 测试 options 传递
  test('route.options', done => {
    const app = createApp()
    let route = new Route(app, (query: any) => query)
    const configs: Array<{ options: any } & TypeHandler> = [
      {
        options: null,
        type: HANDLER_TYPE.config,
        handler: (route: any) => {
          route.options.success = 'done'
          return route
        },
      },
    ]
    app.before((ctx: any) => {
      done(expect(ctx.route.options.success).toBe('done'))
    })
    route = createRouter(configs, route)
    const req: any = { query: { name: 'route' } }
    const res: any = {}
    route.excuteAction(req, res, noop)
  })


  // 测试 config 里面动态插入 before
  test('route.dynamic insertion', async () => {
    const app = createApp()
    let route = new Route(app, function (query: any) {
      return { ...query, ...this.route.options }
    })
    const configs: Array<{ options: any } & TypeHandler> = [
      {
        options: null,
        type: HANDLER_TYPE.config,
        handler: (route: any) => {
          // 在 config 里动态插入 before
          route.before((ctx: any) => {
            ctx.injects = [{ ...ctx.injects[0], handler: 'dynamic' }]
          })
          route.options.before = 1
          return route
        },
      },
    ]
    route.after((ctx: any, result: any) => {
      return { ...result, after: 1 }
    })
    route = createRouter(configs, route)
    const req: any = { query: { name: 'route' } }
    const res: any = {}
    const ret = await route.excuteAction(req, res, noop)
    expect(ret).toEqual({
      code: 200, data: { name: 'route', after: 1, before: 1, handler: 'dynamic' }, message: 'success',
    })
  })
})
