import { ControllerContext } from './controller'
import { isArrayLike } from './utils'
import {
  Request,
  Response,
  RequestHandler,
} from 'express'
import { Application } from './application'
import { TypeHandler, HANDLER_TYPE } from './decorator'
import { ExpressRouterHandler, FilterBeforeHandler, FilterAfterHandler, ReadonlyRoute } from '~/route'
import { ActionArray, execute } from './action-array'

export class Route {
  /**
   * 路由 controller 名称
   */
  public controllerName: string

  /**
   * 路由名称
   */
  public name: string

  /**
   * 路由 path
   */
  public path: string

  /**
   * 路由 http Method
   */
  public method: string

  /**
   * 原始路由挂载方法
   */
  public action: ExpressRouterHandler

  /**
   * 路由配置（外部使用）
   */
  public options: any

  /**
   * 原始路由挂载方法
   */
  public app: Application
  /**
   * 路由处理前函数（前置）
   */
  public beforeActions: ActionArray
  /**
   * 路由处理后函数（后置）
   */
  public afterActions: ActionArray

  /**
   * express 中间件
   */
  private _middlewares: RequestHandler[] = []

  constructor(app: Application, action: ExpressRouterHandler) {
    this.beforeActions = new ActionArray()
    this.afterActions = new ActionArray()
    this.app = app
    this.action = action
    this.options = {}
  }


  /**
   * 路由处理中函数
   * @param route 
   * @param req 
   * @param res 
   * @param next 
   * @param action 
   * @param mount 
   */
  public async excuteAction(req: Request, res: Response, next: Function) {
    const context = new ControllerContext()
    context.route = this.toObject()
    context.req = req
    context.res = res
    // 前置路由返回的上下文
    // 路由异常
    let err: Error
    // let ctx: any = 
    try {
      await execute(
        this.app.beforeActions.concat(this.beforeActions),
        context,
      )
    } catch (error) {
      err = error
    }
    let ret: any
    // 前置路由已经异常，传递给后置路由
    if (!err) {
      try {
        ret = await Promise.resolve(isArrayLike(context.injects) ?
          this.action.apply(context, context.injects) : this.action.call(context, context.injects))
      } catch (error) {
        err = error
      }
    }
    // 如果后置路由异常，则直接抛出全局异常
    // @TODO 这里是否需要捕获异常，完善堆栈？

    let value: any
    try {
      value = await execute(
        this.afterActions.concat(this.app.afterActions),
        context,
        ret,
        err,
      )
    } catch (error) {
      /**
       * 如果错误延伸到最后，则传递错误信息
       * express 异步错误需要 next 传递
       */
      next(error)
    }
    if (value !== undefined) {
      ret = value
    }
    return ret
  }

  /**
   * 挂载路由的前置句柄
   * @param action 
   */
  public before<T extends any[]>(action: FilterBeforeHandler<T>) {
    this.beforeActions.push(action)
    return this
  }

  /**
   * 挂载路由的后置句柄
   * @param action 
   */
  public after<T extends any[]>(action: FilterAfterHandler<T>) {
    this.afterActions.push(action)
    return this
  }

  /**
   * 前置 express 中间件
   * @param handlers 
   */
  public use(...handlers: RequestHandler[]) {
    this._middlewares.push.apply(this._middlewares, handlers)
    return this
  }

  /**
   * 生成 express 挂载的方法
   */
  public mount() {
    const handler = this.excuteAction.bind(this)
    // 只所以留这个挂载方法是因为 API 设计上需要保留可扩展性
    return {
      path: this.path,
      handler,
      handlers: this._middlewares.length ? this._middlewares.concat(this.excuteAction.bind(this)) : [handler],
    }
  }

  /**
   * 生成简易版的路由配置，只读（外部使用）
   */
  public toObject(): ReadonlyRoute {
    return {
      controllerName: this.controllerName,
      name: this.name,
      path: this.path,
      method: this.method,
      options: this.options,
    }
  }
}



/**
 * 解析 route 相关的装饰器逻辑
 * - 解析路由配置型装饰器
 * - 解析 Filter 型装饰器
 * @param configs 
 * @param route 
 */
export const createRouter = (configs: TypeHandler[], route: Route) => {
  // 再处理 configHandler，这样 configHanler 就可以获取完整的 route 配置
  const newRoute = configs.reduce((route, config) => {
    if (config.type == HANDLER_TYPE.config) { // 路由配置型
      // @TODO 可以在 handler 里面 push filters
      const newRoute = config.handler(route as any)
      if (!(newRoute instanceof Route)) {
        throw TypeError(`[Controller]Filter:handle: Filter handle needs to return the Route object, route: ${JSON.stringify(newRoute)}`)
      }
      // newRoute.path = options.base.length && newRoute.path.startsWith(options.base)
      //   ? newRoute.path : resolveRoutePath(options.base, newRoute.path)
      return newRoute
    }
    return route
  }, route)

  configs.forEach(config => {
    // 前置 filter
    if (config.type == HANDLER_TYPE.before) {
      newRoute.before(config.handler)
    }
  })

  // 后置 filter
  configs.forEach(config => {
    if (config.type == HANDLER_TYPE.after) {
      newRoute.after(config.handler)
    }
  })
  return newRoute
}
