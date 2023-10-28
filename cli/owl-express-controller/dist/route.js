"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRouter = exports.Route = void 0;
const controller_1 = require("./controller");
const utils_1 = require("./utils");
const decorator_1 = require("./decorator");
const action_array_1 = require("./action-array");
class Route {
    constructor(app, action) {
        /**
         * express 中间件
         */
        this._middlewares = [];
        this.beforeActions = new action_array_1.ActionArray();
        this.afterActions = new action_array_1.ActionArray();
        this.app = app;
        this.action = action;
        this.options = {};
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
    excuteAction(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const context = new controller_1.ControllerContext();
            context.route = this.toObject();
            context.req = req;
            context.res = res;
            // 前置路由返回的上下文
            // 路由异常
            let err;
            // let ctx: any = 
            try {
                yield (0, action_array_1.execute)(this.app.beforeActions.concat(this.beforeActions), context);
            }
            catch (error) {
                err = error;
            }
            let ret;
            // 前置路由已经异常，传递给后置路由
            if (!err) {
                try {
                    ret = yield Promise.resolve((0, utils_1.isArrayLike)(context.injects) ?
                        this.action.apply(context, context.injects) : this.action.call(context, context.injects));
                }
                catch (error) {
                    err = error;
                }
            }
            // 如果后置路由异常，则直接抛出全局异常
            // @TODO 这里是否需要捕获异常，完善堆栈？
            let value;
            try {
                value = yield (0, action_array_1.execute)(this.afterActions.concat(this.app.afterActions), context, ret, err);
            }
            catch (error) {
                /**
                 * 如果错误延伸到最后，则传递错误信息
                 * express 异步错误需要 next 传递
                 */
                next(error);
            }
            if (value !== undefined) {
                ret = value;
            }
            return ret;
        });
    }
    /**
     * 挂载路由的前置句柄
     * @param action
     */
    before(action) {
        this.beforeActions.push(action);
        return this;
    }
    /**
     * 挂载路由的后置句柄
     * @param action
     */
    after(action) {
        this.afterActions.push(action);
        return this;
    }
    /**
     * 前置 express 中间件
     * @param handlers
     */
    use(...handlers) {
        this._middlewares.push.apply(this._middlewares, handlers);
        return this;
    }
    /**
     * 生成 express 挂载的方法
     */
    mount() {
        const handler = this.excuteAction.bind(this);
        // 只所以留这个挂载方法是因为 API 设计上需要保留可扩展性
        return {
            path: this.path,
            handler,
            handlers: this._middlewares.length ? this._middlewares.concat(this.excuteAction.bind(this)) : [handler],
        };
    }
    /**
     * 生成简易版的路由配置，只读（外部使用）
     */
    toObject() {
        return {
            controllerName: this.controllerName,
            name: this.name,
            path: this.path,
            method: this.method,
            options: this.options,
        };
    }
}
exports.Route = Route;
/**
 * 解析 route 相关的装饰器逻辑
 * - 解析路由配置型装饰器
 * - 解析 Filter 型装饰器
 * @param configs
 * @param route
 */
const createRouter = (configs, route) => {
    // 再处理 configHandler，这样 configHanler 就可以获取完整的 route 配置
    const newRoute = configs.reduce((route, config) => {
        if (config.type == decorator_1.HANDLER_TYPE.config) { // 路由配置型
            // @TODO 可以在 handler 里面 push filters
            const newRoute = config.handler(route);
            if (!(newRoute instanceof Route)) {
                throw TypeError(`[Controller]Filter:handle: Filter handle needs to return the Route object, route: ${JSON.stringify(newRoute)}`);
            }
            // newRoute.path = options.base.length && newRoute.path.startsWith(options.base)
            //   ? newRoute.path : resolveRoutePath(options.base, newRoute.path)
            return newRoute;
        }
        return route;
    }, route);
    configs.forEach(config => {
        // 前置 filter
        if (config.type == decorator_1.HANDLER_TYPE.before) {
            newRoute.before(config.handler);
        }
    });
    // 后置 filter
    configs.forEach(config => {
        if (config.type == decorator_1.HANDLER_TYPE.after) {
            newRoute.after(config.handler);
        }
    });
    return newRoute;
};
exports.createRouter = createRouter;
