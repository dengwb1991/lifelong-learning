"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilterAndOptions = exports.createConfigDecoratorWithOptionsInClass = exports.createConfigDecoratorWithOptions = exports.createAfterFilterDecoratorWithOptionsInClass = exports.createBeforeFilterDecoratorWithOptionsInClass = exports.createAfterFilterDecoratorWithOptions = exports.createBeforeFilterDecoratorWithOptions = exports.createConfigDecoratorInClass = exports.createConfigDecorator = exports.createAfterFilterDecoratorInClass = exports.createBeforeFilterDecoratorInClass = exports.createAfterFilterDecorator = exports.createBeforeFilterDecorator = exports.isDefaultOptionsValue = exports.HANDLER_TYPE = void 0;
const utils_1 = require("./utils");
const util_1 = require("util");
/**
 * 这里大概实现一个简版的 filter，本质上就是创建中间件
 * 用户自己生成装饰器，token 表示 url 前缀，然后在使用这些装饰器的时候自动补上前缀，从而导致命中中间件
 */
let keyIndex = 0;
const handlerMap = new Map();
/**
 * 路由挂载函数属性（类型）
 */
var HANDLER_TYPE;
(function (HANDLER_TYPE) {
    /**
     * 配置型
     */
    HANDLER_TYPE[HANDLER_TYPE["config"] = 0] = "config";
    /**
     * 前置型
     */
    HANDLER_TYPE[HANDLER_TYPE["before"] = 1] = "before";
    /**
     * 后置型
     */
    HANDLER_TYPE[HANDLER_TYPE["after"] = 2] = "after";
})(HANDLER_TYPE || (exports.HANDLER_TYPE = HANDLER_TYPE = {}));
const controllerKeyPrefix = 'c_d_';
/**
 * 默认 symbol，用于只定义装饰器，但没有装饰器参数的场景，通过这个默认值识别出装饰器
 */
const defaultSymbolValue = Symbol.for(`${controllerKeyPrefix}default_${+new Date()}${~~(Math.random() * 100000)}`);
/**
 * 判断配置项的值是否是默认类型
 * @param val
 */
const isDefaultOptionsValue = (val) => {
    return val === exports.isDefaultOptionsValue;
};
exports.isDefaultOptionsValue = isDefaultOptionsValue;
/**
 * 生成存储 key
 * @param type
 * @param handler
 */
const createKey = (type, handler) => {
    const key = `${controllerKeyPrefix}${keyIndex++}`;
    handlerMap.set(key, { type: type, handler: handler });
    return key;
};
/**
 * 生成方法装饰器，默认配置
 * @param type
 */
const generatorPropertyDecorator = (type) => {
    return (handler) => {
        return function (target, propertyKey, descriptor) {
            const key = createKey(type, handler);
            Reflect.defineMetadata(key, defaultSymbolValue, target, propertyKey);
        };
    };
};
/**
 * 生成方法装饰器，需要配置
 * @param type
 */
const generatorPropertyDecoratorWithOptions = (type) => {
    return (handler) => {
        return (...option) => {
            const fn = handler.apply(null, option);
            if (!(0, utils_1.isFunction)(fn)) {
                throw new TypeError(`[Controller]createDecoratorWithOptions to return function: ${(0, util_1.inspect)(fn)}`);
            }
            return function (target, propertyKey, descriptor) {
                const key = createKey(type, fn);
                Reflect.defineMetadata(key, defaultSymbolValue, target, propertyKey);
            };
        };
    };
};
/**
 * 生成类装饰器，无需配置（仅用于 class）
 * @param type
 */
const generatorPropertyDecoratorInClass = (type) => {
    return (handler) => {
        const key = createKey(type, handler);
        return function (constructor) {
            // 是在这里直接解析 prototype，还是先缓存起来后来获取 filter 的时候再合并？
            // 考虑到以后的可拓展性，逻辑密集度进行解耦
            // 所以这里先存起来，在后面解析 Route 的时候再拼接成队列
            Reflect.defineMetadata(key, defaultSymbolValue, constructor);
        };
    };
};
/**
 * 生成类装饰器，需要配置（仅用于 class）
 * @param type
 */
const generatorPropertyDecoratorWithOptionsInClass = (type) => {
    return (handler) => {
        return (...option) => {
            const fn = handler.apply(null, option);
            if (!(0, utils_1.isFunction)(fn)) {
                throw new TypeError(`[Controller]createDecoratorWithOptions need to return function: ${(0, util_1.inspect)(fn)}`);
            }
            return function (constructor) {
                const key = createKey(type, fn);
                Reflect.defineMetadata(key, defaultSymbolValue, constructor);
            };
        };
    };
};
// #region 无配置型装饰器
/**
 * 生成过滤器型装饰器（前置）
 * @param handler
 */
exports.createBeforeFilterDecorator = generatorPropertyDecorator(HANDLER_TYPE.before);
/**
 * 生成过滤器型装饰器（后置）
 * @param handler
 */
exports.createAfterFilterDecorator = generatorPropertyDecorator(HANDLER_TYPE.after);
/**
 * 生成过滤器型装饰器（前置）
 * 用于装饰 class
 * @param handler
 */
exports.createBeforeFilterDecoratorInClass = generatorPropertyDecoratorInClass(HANDLER_TYPE.before);
/**
 * 生成过滤器型装饰器 (后置)
 * 用于装饰 class
 */
exports.createAfterFilterDecoratorInClass = generatorPropertyDecoratorInClass(HANDLER_TYPE.after);
/**
 * 生成路由配置型装饰器
 */
exports.createConfigDecorator = generatorPropertyDecorator(HANDLER_TYPE.config);
/**
 * 生成路由配置型装饰器
 * 用于装饰 class
 */
exports.createConfigDecoratorInClass = generatorPropertyDecorator(HANDLER_TYPE.config);
// #endregion
// #region 有配置型装饰器
/**
 * 生成过滤器型装饰器（前置）
 * 可配置
 * @param handler
 */
exports.createBeforeFilterDecoratorWithOptions = generatorPropertyDecoratorWithOptions(HANDLER_TYPE.before);
/**
 * 生成过滤器型装饰器（后置）
 * 可配置
 * @param handler
 */
exports.createAfterFilterDecoratorWithOptions = generatorPropertyDecoratorWithOptions(HANDLER_TYPE.after);
/**
 * 生成过滤器型装饰器（前置）
 * 仅用于 class，可配置
 * @param handler
 */
exports.createBeforeFilterDecoratorWithOptionsInClass = generatorPropertyDecoratorWithOptionsInClass(HANDLER_TYPE.before);
/**
 * 生成过滤器型装饰器（后置）
 * 仅用于 class，可配置
 * @param handler
 */
exports.createAfterFilterDecoratorWithOptionsInClass = generatorPropertyDecoratorWithOptionsInClass(HANDLER_TYPE.before);
/**
 * 生成路由配置型装饰器
 * 可配置
 * @param handler
 */
exports.createConfigDecoratorWithOptions = generatorPropertyDecoratorWithOptions(HANDLER_TYPE.config);
/**
 * 生成路由配置型装饰器
 * 用于 class，可配置
 * @param handler
 */
exports.createConfigDecoratorWithOptionsInClass = generatorPropertyDecoratorWithOptionsInClass(HANDLER_TYPE.config);
// #endregion
/**
 * 根据反射获取 Filter 配置和 options
 * @param key
 */
const getFilterAndOptions = (target, propertyKey) => {
    let res = [];
    const targetKeys = Reflect.getMetadataKeys(target, propertyKey);
    const keys = targetKeys.filter((key) => {
        return handlerMap.has(key);
    });
    // 防止 object 排序不正确，做一次排序从而确保正确的 action 执行顺序
    keys.sort((a, b) => {
        // 默认排序会将 a_1, a_11 排在一起，这里强制排一遍
        const v1 = parseInt(a.replace(controllerKeyPrefix, ''), 10);
        const v2 = parseInt(b.replace(controllerKeyPrefix, ''), 10);
        return v1 - v2;
    });
    if (keys) {
        res = keys.map(key => {
            // const options = Reflect.getMetadata(key, target, propertyKey)
            const typeHandler = handlerMap.get(key);
            return typeHandler;
        });
    }
    return res;
};
exports.getFilterAndOptions = getFilterAndOptions;
