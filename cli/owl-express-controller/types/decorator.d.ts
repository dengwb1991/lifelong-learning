import {
  FilterBeforeHandler,
  FilterAfterHandler,
  ConfigHandler,
  ConfigHandlerWithOptions,
  FilterBeforeHandlerWithOptions,
  FilterAfterHandlerWithOptions,
} from './route'

export interface MethodDecoratorWithOption<T extends any[]> {
  (...option: T): MethodDecorator
}

export interface ClassDecoratorWithOptions<T extends any[]> {
  (...option: T): ClassDecorator
}

/**
 * 装饰器生成工厂
 */
export interface DecoratorFactory {
  /**
   * 生成过滤器型装饰器（前置）
   * @param handler 
   */
  before: <T extends any[]= any[]>(handler: FilterBeforeHandler<T>) => MethodDecorator
  /**
   * 生成过滤器型装饰器（后置）
   * @param handler 
   */
  after: <T extends any[]= any[]>(handler: FilterAfterHandler<T>) => MethodDecorator
  /**
   * 生成过滤器型装饰器（前置）
   * 用于装饰 class
   * @param handler 
   */
  beforeClass: <T extends any[]= any[]>(handler: FilterBeforeHandler<T>) => ClassDecorator
  /**
   * 生成过滤器型装饰器 (后置)
   * 用于装饰 class
   * @param handler 
   */
  afterClass: <T extends any[]= any[]>(handler: FilterBeforeHandler<T>) => ClassDecorator
  /**
   * 生成路由配置型装饰器
   * @param handler 
   */
  config: (handler: ConfigHandler) => MethodDecorator
  /**
   * 生成路由配置型装饰器
   * 用于装饰 class
   */
  configClass: (handler: ConfigHandler) => ClassDecorator

  /**
   * 生成过滤器型装饰器（前置）
   * 可配置
   * @param handler 
   * @param T - 外层函数参数
   * @param O - 内层函数参数
   */
  beforeWithOptions: <O extends any[], T extends any[]= any[]>(handler: FilterBeforeHandlerWithOptions<O, T>) => MethodDecoratorWithOption<O>
  /**
   * 生成过滤器型装饰器（后置）
   * 可配置
   * @param handler 
   */
  afterWithOptions: <O extends any[], T extends any[]= any[]>(handler: FilterAfterHandlerWithOptions<O, T>) => MethodDecoratorWithOption<O>
  /**
   * 生成过滤器型装饰器（前置）
   * 仅用于 class，可配置
   * @param handler 
   */
  beforeClassWithOptions: <O extends any[], T extends any[]= any[]>(handler: FilterBeforeHandlerWithOptions<O, T>) => ClassDecoratorWithOptions<O>
  /**
   * 生成过滤器型装饰器（后置）
   * 仅用于 class，可配置
   * @param handler 
   */
  afterClassWithOptions: <O extends any[], T extends any[]= any[]>(handler: FilterAfterHandlerWithOptions<O, T>) => ClassDecoratorWithOptions<O>
  /**
   * 生成路由配置型装饰器
   * 可配置
   */
  configWithOptions: <T extends any[]>(handler: ConfigHandlerWithOptions<T>) => MethodDecoratorWithOption<T>
  /**
   * 生成路由配置型装饰器
   * 用于 class，可配置
   */
  configClassWithOptions: <O extends any[]>(handler: ConfigHandlerWithOptions<O>) => ClassDecoratorWithOptions<O>
}