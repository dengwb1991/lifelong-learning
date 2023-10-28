"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
require("reflect-metadata");
const path = require("path");
const controller_1 = require("./controller");
const utils_1 = require("./utils");
const events_1 = require("events");
const action_array_1 = require("./action-array");
const debug = (0, utils_1.createDebug)('application');
class Application extends events_1.EventEmitter {
    constructor(options) {
        super();
        debug('constructor init options params: %o', options);
        options = Object.assign({}, Application.DEFAULTS, options);
        if (options.base) {
            /**
             * 去掉尾部的空格，前面的空格不去(因为会命中 express 不同的规则)
             */
            options.base = options.base.replace(/\/$/g, '');
        }
        if (options.app == null) {
            throw new TypeError(`[Controller]options:app:Express app is required`);
        }
        if (options.root == null) {
            options.root = path.resolve(__dirname, './');
        }
        // throw `[Controller]options:root:The controller root directory is required`
        this.app = options.app;
        this.options = options;
        // 挂载钩子
        this.beforeActions = new action_array_1.ActionArray();
        this.afterActions = new action_array_1.ActionArray();
        // @TODO 试试
        // if (Array.isArray(options.beforeActions)) {
        // }
        // this.afterActions = new AfterActionArray()
        // if (Array.isArray(options.afterActions)) {
        //   this.afterActions.pushActions(options.afterActions)
        // }
        this.emit('create');
        this.createRouter();
        /**
         * 因为上层可以监听事件，所以做成异步挂载
         * 否则内层触发了事件外层捕获不到
         */
        this.emit('mount');
        setImmediate(() => {
            debug('mount');
            this.mount();
        });
        // this.mount()
    }
    /**
     * 挂载全局前置钩子函数
     */
    before(action) {
        this.beforeActions.push(action);
        this.emit('beforeAction');
        return this;
    }
    // @TODO 应该还可以挂载全局的配置函数？
    after(action) {
        this.afterActions.push(action);
        this.emit('afterAction');
        return this;
    }
    createRouter() {
        let routes;
        try {
            routes = (0, utils_1.readDirFile)(this.options.root);
        }
        catch (error) {
            throw new ReferenceError(`[Controller.createRouter]Check file exceptions. path: [${this.options.root}], error: [${error}]`);
        }
        this.routes = routes.reduce((previous, fileInfo) => {
            // /root/controller/index.js => index.js，绝对路径转相对路径
            const fileName = path.relative(__dirname, fileInfo.path);
            if (!this.options.matchFilename(fileName))
                return previous;
            const controller = require(fileName);
            // ../controller/create-provider-controller.js => create-provider-controller => create-provider => createProvider
            let controllerName = fileName.replace(/\.*\/([^\/]+\/)*|\.[jt]s/g, '');
            debug('read route file, path: %s , controler name: %s', fileName, controllerName);
            if (typeof controller.default === 'function') {
                const constructor = controller.default;
                // router 的 class 定义了名字，并且 name 不是编译过后的 default
                if (constructor.name && !constructor.name.startsWith('default')) {
                    controllerName = constructor.name;
                }
                // 修正 controller 名称
                controllerName = this.options.trimFilename(controllerName);
                // 配置了驼峰转 path
                let uri = (0, controller_1.createPath)(this.options.pathMode, controllerName);
                /**
                 * fileInfo.uri === example/deep
                 * 如果是 1 级分目录，则 fileInfo.uri 为 ""
                 */
                if (fileInfo.uri)
                    uri = `${fileInfo.uri}/${uri}`;
                return previous.concat((0, controller_1.createController)(controller.default, controllerName, uri, this));
            }
            else {
                throw new Error(
                // tslint:disable-next-line:max-line-length
                `[Controller]${path.resolve(__dirname, fileInfo.path)} no default export...path: ${fileName}, controllerName: ${controllerName}`);
            }
        }, []);
        this.emit('created');
    }
    mount() {
        this.routes.forEach(route => {
            const app = this.options.app;
            if (!app[route.method]) {
                throw new TypeError(`[Controller.router:method]Property method does not support this value:${route.method}, route: ${route.path}`);
            }
            const routeInfo = route.mount();
            const params = [];
            if (routeInfo.path != null) {
                params.push(routeInfo.path);
            }
            if (routeInfo.handlers.length) {
                params.push.apply(params, routeInfo.handlers);
            }
            params.push(routeInfo.handler);
            debug('mounting route, %s %s', route.method.toUpperCase(), route.path);
            app[route.method].apply(app, params);
        });
        debug('mounted routes');
        this.emit('mounted', this.routes);
    }
}
exports.Application = Application;
Application.DEFAULTS = {
    base: '/',
    matchFilename(filename) {
        if (!filename.match(/-controller\.[^\.]+$/i))
            return false;
        if (/\.map$/.test(filename))
            return false;
        return true;
    },
    trimFilename(filename) {
        return filename
            // Home-Test-controller -> Home-Test
            .replace(/(-)?controller$/i, '')
            // Home-Test -> HomeTest
            .replace(/\-(\w)/g, (_, letter) => {
            return letter.toUpperCase();
        })
            // HomeTest -> homeTest
            .replace(/^(\w)/, (_, letter) => {
            return letter.toLowerCase();
        });
    },
    pathMode: 'normal',
};
