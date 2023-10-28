import { Route, createRouter } from './route'
import { getFilterAndOptions } from './decorator'
import {
  Request,
  Response,
} from 'express'
import { Application } from './application'
import { resolveRoutePath, camelCase2Path, hyphenate2Path, createDebug } from './utils'
import { ReadonlyRoute } from '~/route'
import { PathModeCustomFunction } from '~/application'
const debug = createDebug('controller')

/**
 * 反射对象，生成路由相关信息
 * @param constructor 
 * @param uri 
 * @param app 
 */
export const createController = (constructor: any, controllerName: string, uri: string, app: Application): Route[] => {
  const routes: Route[] = []
  debug('[%s]: create controller, uri: "%s"', controllerName, uri)
  // 循环所有属性
  let controller: any = null

  try {
    controller = new constructor()
  } catch (error) {
    throw new Error(`[Controller]Filter:handle: constructor error: ${error.message}`)
  }
  if (controller == null) return routes
  // 获取类装饰器
  const classConfigs = getFilterAndOptions(constructor)

  debug('[%s]: Controller class decorator: %o', controllerName, classConfigs)

  // 默认声明的 class 都是不可枚举的，只能通过这种 hack 的方式获取
  Object.getOwnPropertyNames(constructor.prototype).forEach(propertyKey => {
    debug('[%s/%s]: parse router properties', controllerName, propertyKey)
    if (propertyKey === 'constructor' || typeof controller[propertyKey] !== 'function') return
    // 获取静态属性的类型
    // const getMetadata = factoryGetMetadata(controller, propertyKey)
    // const metaDesignType = getMetadata('design:type')
    // 方法才包装
    const action = controller[propertyKey]
    let route = new Route(app, action)
    route.controllerName = controllerName
    route.name = propertyKey
    const path = resolveRoutePath(
      app.options.base,
      '/',
      uri,
      propertyKey === 'index' ?
        // 配置了驼峰转换
        '' : `/${createPath(app.options.pathMode, propertyKey)}`)
    debug('[%s/%s]: Setting default uri path for routing parsed', controllerName, propertyKey, path)
    route.path = path
    /**
     * 默认 http method 为 all
     */
    route.method = 'all'

    debug('[%s/%s]: creating router, path: "%s"', controllerName, propertyKey, route.path)
    const configs = getFilterAndOptions(controller, propertyKey)

    debug('[%s/%s]: Controller properties decorator: %o', controllerName, propertyKey, configs)
    route = createRouter(classConfigs.concat(configs), route)

    debug('[%s/%s]: router created successfully, route: %o', controllerName, propertyKey, route)
    routes.push(route)
  })
  return routes
}

/**
 * 执行上下文
 */
export class ControllerContext {
  public req: Request
  public res: Response
  public injects: any[] = []
  public route: ReadonlyRoute
  public options: any = {}
}

/**
 * mode 解析规则表，对应 Application 的 mode 配置
 */
const pathModeMap = {
  normal: (str: string) => str,
  camelCase: camelCase2Path,
  hyphenate: hyphenate2Path,
}

/**
 * 根据 Application 配置的 mode 命中解析规则
 * @param mode 
 * @param str 
 */
export const createPath = (pathMode: 'normal' | 'camelCase' | 'hyphenate' | PathModeCustomFunction, str: string) => {
  let fn = pathModeMap.normal
  // 为 function，则重写
  if (typeof pathMode === 'function') {
    fn = pathMode
  } else if (pathModeMap[pathMode]) { // 否则(为字符串)，按照规则表里查找，默认为 normal
    fn = pathModeMap[pathMode]
  }
  return fn(str)
}
