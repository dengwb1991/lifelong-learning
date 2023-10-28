import { RequestHandler, ErrorRequestHandler, IRouterMatcher, Express } from 'express'
import { Application } from './application'

/**
 * express 路由
 */
export type ExpressRouterHandler = RequestHandler | ErrorRequestHandler | IRouterMatcher<Express>


export interface ActionArray extends Array<Function[]> { }

/**
 * 只读的简化版 route，用于中间件上下文传递
 */
export interface ReadonlyRoute {
  /**
   * 路由 controller 名称
   */
  controllerName: string
  /**
   * 路由名称
   */
  name: string
  /**
   * 路由 path
   */
  path: string
  /**
   * 路由 http Method
   */
  method: string
  /**
   * 路由配置（外部使用），注意是只读的，如果需要动态赋值，请使用 context.options
   */
  options: any
}

/**
 * 内部路由对象，非公开对象
 */
export interface Route {
  constructor(app: Application, action: ExpressRouterHandler): void
  /**
   * 路由 controller 名称
   */
  controllerName: string
  /**
   * 路由名称
   */
  name: string
  /**
   * 路由 path
   */
  path: string
  /**
   * 路由 http Method
   */
  method: string
  /**
   * 原始路由挂载方法
   */
  action: ExpressRouterHandler
  /**
   * 路由配置（外部使用）
   */
  options: any
  /**
   * 用于获取配置
   */
  app: Application
  /**
   * 挂载前置 express 中间件，类似 express.use
   * @param handlers 中间件，针对此路由的 express 中间件
   */
  use(...handlers: RequestHandler[]): this
  /**
   * 挂载路由前置钩子函数（filter）
   * @param action 中间件函数
   * @param errorHandler 中间件异常处理函数
   */
  before<T extends any[]>(action: FilterBeforeHandler<T>): this
  /**
   * 挂载路由后置函数(filter)
   * @param action 中间件函数
   * @param errorHandler 中间件异常处理函数
   */
  after<T extends any[]>(action: FilterBeforeHandler<T>): this

  /**
   * 提供给中间件使用的只读版 route
   */
  toObject(): ReadonlyRoute
  /**
   * 危险操作的数据在 ts 中不放出来，但实际仍然会传递
   */
  // /**
  //  * 路由处理前函数（前置）
  //  */
  // beforeActions: BeforeActionArray
  // /**
  //  * 路由处理后函数（后置）
  //  */
  // afterActions: AfterActionArray
}

/**
 * 配置函数
 */
export type ConfigHandler = (route: Route) => Route

/**
 * 配置函数（可配置）
 */
export type ConfigHandlerWithOptions<T extends any[]> = (...params: T) => ConfigHandler

/**
 * mmp 无法用 interface 重载，如果这样写 ts 会将参数 mixin（自动变成 | 的关系）
 */
// export interface FilterBeforeHandler<P extends any[]> {
//   (this: MFEController.ControllerContext, context: MFEController.ControllerContext, ...params: P): MFEController.ControllerContext | void | Promise<any>
//   (this: MFEController.ControllerContext, error: Error, context: MFEController.ControllerContext, ...params: P): MFEController.ControllerContext | void | Promise<any>
// }

/**
 * 前置函数
 */
export type FilterBeforeHandler<P extends any[]> =
  ((this: MFEController.ControllerContext, context: MFEController.ControllerContext, ...params: P) => any)
  |
  ((this: MFEController.ControllerContext, error: Error, context: MFEController.ControllerContext, ...params: P) => any)



/**
 * 前置函数（可配置）
 */
export type FilterBeforeHandlerWithOptions<P extends any[], O extends any[]> = (...params: P) => FilterBeforeHandler<O>

// export interface FilterAfterHandler<P extends any[]> {
//   (this: MFEController.ControllerContext, context: MFEController.ControllerContext, ...params: P): any
//   (this: MFEController.ControllerContext, error: Error, context: MFEController.ControllerContext, ...params: P): any
// }

/**
 * 后置函数
 */
export type FilterAfterHandler<P extends any[]> =
  ((this: MFEController.ControllerContext, context: MFEController.ControllerContext, ...params: P) => any)
  |
  ((this: MFEController.ControllerContext, error: Error, context: MFEController.ControllerContext, ...params: P) => any)

/**
 * 后置函数（可配置）
 */
export type FilterAfterHandlerWithOptions<P extends any[], O extends any[]> = (...params: P) => FilterAfterHandler<O>


export type ActionHandler<T extends any[]> = ConfigHandler | FilterBeforeHandler<T> | FilterAfterHandler<T>