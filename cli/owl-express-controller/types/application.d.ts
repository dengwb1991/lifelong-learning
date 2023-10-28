import { Express, Router, Request, Response } from 'express'
import { EventEmitter } from 'events'
import { FilterBeforeHandler, FilterAfterHandler, ReadonlyRoute } from './route'

declare global {
  namespace MFEController {
    /**
     * 执行上下文
     */
    export class ControllerContext {
      /**
       * express request
       */
      req: Request
      /**
       * express response
       */
      res: Response
      /**
       * 注入的参数（array）
       */
      injects: Array<any>
      /**
       * 路由配置
       */
      route: ReadonlyRoute
      /**
       * 中间件数据挂载
       */
      options: any
    }
  }
}

/**
 * 用于将命中的路径转为 url
 */
export interface PathModeCustomFunction {
  (str: string): string
}



/**
 * 初始化配置
 */
export interface ControllersOptions {
  /**
   * 请求根路径，默认为 /
   */
  base?: string
  /**
   * controller 文件根目录
   * 默认为 ./
   */
  root?: string
  /**
   * express 应用
   */
  app: Express | Router
  /**
   * controller 匹配规则
   */
  matchFilename?: (filename: string) => boolean
  /**
   * controller 修正规则
   */
  trimFilename?: (filename: string) => string
  /**
   * 路由解析规则，是否将驼峰拼接为路径 url
   * normal - 默认不抓怒汉
   * camelCase - 驼峰转 url: camelCase => camel/case
   * hyphenate - 驼峰转连字符 url: camelCase => camel-case
   */
  pathMode?: 'normal' | 'camelCase' | 'hyphenate' | PathModeCustomFunction
}

/**
 * 应用程序曝露出口
 */
export interface Application extends EventEmitter {
  (options: ControllersOptions): this
  /**
   * 挂载的 options
   */
  readonly options: ControllersOptions
  /**
   * express
   */
  app: Express | Router
  /**
   * 挂载全局前置钩子函数（filter）
   * @param action 中间件函数
   * @param errorHandler 中间件异常处理函数
   */
  before<T extends any[]>(action: FilterBeforeHandler<T>): this
  /**
   * 挂载全局后置函数(filter)
   * @param action 中间件函数
   * @param errorHandler 中间件异常处理函数
   */
  after<T extends any[]>(action: FilterBeforeHandler<T>): this
}