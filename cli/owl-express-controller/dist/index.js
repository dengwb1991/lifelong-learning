"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decorator = exports.BaseController = void 0;
require("reflect-metadata");
const application_1 = require("./application");
const controller_1 = require("./controller");
const decorators = require("./decorator");
/**
 * 自动挂载路由，并且可以通过装饰器为路由注入其他东西 => Router => Controller
 * 设计思想：
 * 通过 signature 签名生成自己的装饰器
 *  - 挂载为 express 中间件
 *  - 获取处理路由细节
 * 自动读取路由 (Controller) 目录
 * 自动处理参数和返回结果上下文，并且可以通过装饰器重写和扩展自己的处理上下文
 *
 * 核心的目的只有一个： Controller 中只处理自己的业务逻辑，路由和其他的细节处理都应该自动完成
 */
exports.default = (options) => {
    return new application_1.Application(options);
};
/**
 * controller 上下文注入
 */
exports.BaseController = controller_1.ControllerContext;
exports.decorator = {
    // 无配置型
    /**
     * 生成过滤器型装饰器（前置）
     * @param handler
     */
    before: decorators.createBeforeFilterDecorator,
    /**
     * 生成过滤器型装饰器（后置）
     * @param handler
     */
    after: decorators.createAfterFilterDecorator,
    /**
     * 生成过滤器型装饰器（前置）
     * 用于装饰 class
     * @param handler
     */
    beforeClass: decorators.createBeforeFilterDecoratorInClass,
    /**
     * 生成过滤器型装饰器 (后置)
     * 用于装饰 class
     * @param handler
     */
    afterClass: decorators.createAfterFilterDecoratorInClass,
    /**
     * 生成路由配置型装饰器
     * @param handler
     */
    config: decorators.createConfigDecorator,
    /**
     * 生成路由配置型装饰器
     * 用于装饰 class
     */
    configClass: decorators.createConfigDecoratorInClass,
    // 有配置型
    /**
     * 生成过滤器型装饰器（前置）
     * 可配置
     * @param handler
     */
    beforeWithOptions: decorators.createBeforeFilterDecoratorWithOptions,
    /**
     * 生成过滤器型装饰器（后置）
     * 可配置
     * @param handler
     */
    afterWithOptions: decorators.createAfterFilterDecoratorWithOptions,
    /**
     * 生成过滤器型装饰器（前置）
     * 仅用于 class，可配置
     * @param handler
     */
    beforeClassWithOptions: decorators.createBeforeFilterDecoratorWithOptionsInClass,
    /**
     * 生成过滤器型装饰器（后置）
     * 仅用于 class，可配置
     * @param handler
     */
    afterClassWithOptions: decorators.createAfterFilterDecoratorWithOptionsInClass,
    /**
     * 生成路由配置型装饰器
     * 可配置
     */
    configWithOptions: decorators.createConfigDecoratorWithOptions,
    /**
     * 生成路由配置型装饰器
     * 用于 class，可配置
     */
    configClassWithOptions: decorators.createConfigDecoratorWithOptionsInClass,
};
