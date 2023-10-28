import { ConfigHandler, FilterBeforeHandler, FilterAfterHandler, ActionHandler } from '~/route'
import { isFunction } from './utils'
import { inspect } from 'util'
/**
 * 这里大概实现一个简版的 filter，本质上就是创建中间件
 * 用户自己生成装饰器，token 表示 url 前缀，然后在使用这些装饰器的时候自动补上前缀，从而导致命中中间件
 */

let keyIndex = 0

const handlerMap = new Map<string, TypeHandler>()

/**
 * 路由挂载函数属性（类型）
 */
export enum HANDLER_TYPE {
  /**
   * 配置型
   */
  config = 0,
  /**
   * 前置型
   */
  before = 1,
  /**
   * 后置型
   */
  after = 2,
}

/**
 * 挂载的装饰器数据存放格式\
 */
export type TypeHandler = {
  /**
   * 路由配置型装饰器
   */
  type: HANDLER_TYPE.config,
  handler: ConfigHandler,
} | {
  /**
   * 过滤器型装饰器（前置）
   */
  type: HANDLER_TYPE.before,
  handler: FilterBeforeHandler<any>,
} | {
  /**
   * 过滤器型装饰器（后置）
   */
  type: HANDLER_TYPE.after,
  handler: FilterAfterHandler<any>,
}

const controllerKeyPrefix = 'c_d_'

/**
 * 默认 symbol，用于只定义装饰器，但没有装饰器参数的场景，通过这个默认值识别出装饰器
 */
const defaultSymbolValue = Symbol.for(`${controllerKeyPrefix}default_${+new Date()}${~~(Math.random() * 100000)}`)

/**
 * 判断配置项的值是否是默认类型
 * @param val 
 */
export const isDefaultOptionsValue = (val: any) => {
  return val === isDefaultOptionsValue
}

/**
 * 生成存储 key
 * @param type 
 * @param handler 
 */
const createKey = <T>(type: HANDLER_TYPE, handler: T) => {
  const key = `${controllerKeyPrefix}${keyIndex++}`
  handlerMap.set(key, { type: type as any, handler: handler as any })
  return key
}

/**
 * 生成方法装饰器，默认配置
 * @param type 
 */
const generatorPropertyDecorator = <T extends ActionHandler<any>>(type: HANDLER_TYPE) => {
  return (handler: T) => {
    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) {
      const key = createKey(type, handler)
      Reflect.defineMetadata(key, defaultSymbolValue, target, propertyKey)
    }
  }
}

/**
 * 生成方法装饰器，需要配置
 * @param type 
 */
const generatorPropertyDecoratorWithOptions = <H extends ActionHandler<any>>(type: HANDLER_TYPE) => {
  return <T extends S[] | any[], S>(handler: H) => {
    return (...option: T) => {
      const fn = (handler as Function).apply(null, option)
      if (!isFunction(fn)) {
        throw new TypeError(`[Controller]createDecoratorWithOptions to return function: ${inspect(fn)}`)
      }
      return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) {
        const key = createKey(type, fn)
        Reflect.defineMetadata(key, defaultSymbolValue, target, propertyKey)
      }
    }
  }
}

/**
 * 生成类装饰器，无需配置（仅用于 class）
 * @param type 
 */
const generatorPropertyDecoratorInClass = <T extends ActionHandler<any>>(type: HANDLER_TYPE) => {
  return (handler: T) => {
    const key = createKey(type, handler)
    return function (constructor: any) {
      // 是在这里直接解析 prototype，还是先缓存起来后来获取 filter 的时候再合并？
      // 考虑到以后的可拓展性，逻辑密集度进行解耦
      // 所以这里先存起来，在后面解析 Route 的时候再拼接成队列
      Reflect.defineMetadata(key, defaultSymbolValue, constructor)
    }
  }
}

/**
 * 生成类装饰器，需要配置（仅用于 class）
 * @param type 
 */
const generatorPropertyDecoratorWithOptionsInClass = <H extends ActionHandler<any>>(type: HANDLER_TYPE) => {
  return <T extends S[] | any[], S>(handler: H) => {
    return (...option: T) => {
      const fn = (handler as Function).apply(null, option)
      if (!isFunction(fn)) {
        throw new TypeError(`[Controller]createDecoratorWithOptions need to return function: ${inspect(fn)}`)
      }
      return function (constructor: any) {
        const key = createKey(type, fn)
        Reflect.defineMetadata(key, defaultSymbolValue, constructor)
      }
    }
  }
}

// #region 无配置型装饰器

/**
 * 生成过滤器型装饰器（前置）
 * @param handler 
 */
export const createBeforeFilterDecorator =
  generatorPropertyDecorator<FilterBeforeHandler<any>>(HANDLER_TYPE.before)

/**
 * 生成过滤器型装饰器（后置）
 * @param handler 
 */
export const createAfterFilterDecorator =
  generatorPropertyDecorator<FilterAfterHandler<any>>(HANDLER_TYPE.after)

/**
 * 生成过滤器型装饰器（前置）
 * 用于装饰 class
 * @param handler 
 */
export const createBeforeFilterDecoratorInClass =
  generatorPropertyDecoratorInClass<FilterBeforeHandler<any>>(HANDLER_TYPE.before)

/**
 * 生成过滤器型装饰器 (后置)
 * 用于装饰 class
 */
export const createAfterFilterDecoratorInClass =
  generatorPropertyDecoratorInClass<FilterAfterHandler<any>>(HANDLER_TYPE.after)

/**
 * 生成路由配置型装饰器
 */
export const createConfigDecorator =
  generatorPropertyDecorator<ConfigHandler>(HANDLER_TYPE.config)

/**
 * 生成路由配置型装饰器
 * 用于装饰 class
 */
export const createConfigDecoratorInClass =
  generatorPropertyDecorator<ConfigHandler>(HANDLER_TYPE.config)

// #endregion




// #region 有配置型装饰器

/**
 * 生成过滤器型装饰器（前置）
 * 可配置
 * @param handler 
 */
export const createBeforeFilterDecoratorWithOptions =
  generatorPropertyDecoratorWithOptions<FilterBeforeHandler<any>>(HANDLER_TYPE.before)


/**
 * 生成过滤器型装饰器（后置）
 * 可配置
 * @param handler 
 */
export const createAfterFilterDecoratorWithOptions =
  generatorPropertyDecoratorWithOptions<FilterAfterHandler<any>>(HANDLER_TYPE.after)


/**
 * 生成过滤器型装饰器（前置）
 * 仅用于 class，可配置
 * @param handler 
 */
export const createBeforeFilterDecoratorWithOptionsInClass =
  generatorPropertyDecoratorWithOptionsInClass<FilterBeforeHandler<any>>(HANDLER_TYPE.before)

/**
 * 生成过滤器型装饰器（后置）
 * 仅用于 class，可配置
 * @param handler 
 */
export const createAfterFilterDecoratorWithOptionsInClass =
  generatorPropertyDecoratorWithOptionsInClass<FilterBeforeHandler<any>>(HANDLER_TYPE.before)


/**
 * 生成路由配置型装饰器
 * 可配置
 * @param handler 
 */
export const createConfigDecoratorWithOptions =
  generatorPropertyDecoratorWithOptions<ConfigHandler>(HANDLER_TYPE.config)

/**
 * 生成路由配置型装饰器
 * 用于 class，可配置
 * @param handler 
 */
export const createConfigDecoratorWithOptionsInClass =
  generatorPropertyDecoratorWithOptionsInClass<ConfigHandler>(HANDLER_TYPE.config)


// #endregion


/**
 * 根据反射获取 Filter 配置和 options
 * @param key 
 */
export const getFilterAndOptions = (target: any, propertyKey?: string) => {
  let res: TypeHandler[] = []
  const targetKeys = Reflect.getMetadataKeys(target, propertyKey)
  const keys = targetKeys.filter((key: string) => {
    return handlerMap.has(key)
  })
  // 防止 object 排序不正确，做一次排序从而确保正确的 action 执行顺序
  keys.sort((a: string, b: string) => {
    // 默认排序会将 a_1, a_11 排在一起，这里强制排一遍
    const v1 = parseInt(a.replace(controllerKeyPrefix, ''), 10)
    const v2 = parseInt(b.replace(controllerKeyPrefix, ''), 10)
    return v1 - v2
  })
  if (keys) {
    res = keys.map(key => {
      // const options = Reflect.getMetadata(key, target, propertyKey)
      const typeHandler = handlerMap.get(key)
      return typeHandler
    })
  }
  return res
}
