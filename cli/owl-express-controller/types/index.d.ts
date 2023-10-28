import { RequestHandler, ErrorRequestHandler, IRouterMatcher, Express, Router } from 'express'
import * as core from './application'
import * as route from './route'
import * as decorators from './decorator'


export interface Application extends core.Application { }
/**
 * controller 生成配置
 */
export interface ControllersOptions extends core.ControllersOptions { }

/**
 * 装饰器签名类
 * 提供了一系列工具函数用于签发自定义的路由装饰器
 */
export const decorator: decorators.DecoratorFactory
/**
 * 中间件上下文，中间件可以扩展这个上下文
 */
export class BaseController extends MFEController.ControllerContext { }


/**
 * owl-controller 生成的属性装饰器
 */
export interface MethodDecoratorWithOption<T extends any[]> extends decorators.MethodDecoratorWithOption<T> { }

/**
 * owl-controller 生成的类装饰器
 */
export interface ClassDecoratorWithOptions<T extends any[]> extends decorators.ClassDecoratorWithOptions<T> { }

/**
 * route 接口定义
 */
export interface Route extends route.Route { }
/**
 * route 相关
 */
export namespace Route {
  /**
   * 配置中间件
   */
  type ConfigHandler = route.ConfigHandler
  /**
   * 前置中间件
   */
  type FilterBeforeHandler<T extends any[]> = route.FilterBeforeHandler<T>
  /**
   * 后置中间件
   */
  type FilterAfterHandler<T extends any[]> = route.FilterAfterHandler<T>

  /**
   * 配置中间件（可传参）
   */
  type ConfigHandlerWithOptions<T extends any[]> = route.ConfigHandlerWithOptions<T>
  /**
   * 前置中间件（可传参）
   */
  type FilterBeforeHandlerWithOptions<T extends any[]= any[], O extends any[]= any> = route.FilterBeforeHandlerWithOptions<T, O>
  /**
   * 后置中间件（可传参）
   */
  type FilterAfterHandlerWithOptions<T extends any[]= any[], O extends any[]= any> = route.FilterAfterHandlerWithOptions<T, O>

  /**
   * 只读的简化版 route，用于中间件上下文传递
   */
  interface ReadonlyRoute extends route.ReadonlyRoute { }
}

/**
 * 创建 controller
 * @param options 
 */
export default function (options: ControllersOptions): core.Application