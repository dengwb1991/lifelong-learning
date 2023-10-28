"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.ActionArray = void 0;
/**
 * action 队列父类
 */
class ActionArray extends Array {
    pushAction(handlerAction) {
        this.push(handlerAction);
        return this;
    }
}
exports.ActionArray = ActionArray;
/**
 * 执行队列函数
 * 上下文(context)递归传递
 * @param context 上下文
 */
const execute = (actions, context, data, err) => {
    if (!actions.length)
        return context;
    // @TODO 这里是否要注入回调函数？动态判断 injects 是否是 array
    return dispatch(0, data, err);
    function dispatch(i, prevRet, err) {
        const action = actions[i];
        // 终止
        if (!action) {
            if (err) {
                return Promise.reject(err);
            }
            return Promise.resolve(prevRet);
        }
        /**
         * 如果设定了三个参数（err, context, preRet），则表示这是个 errorHandler
         */
        const isErrorHandler = action.length > 2;
        if (err && !isErrorHandler) {
            // 上个中间件的错误传递了下来，但是本次没有捕获，继续往下传递
            return dispatch(i + 1, prevRet, err);
        }
        try {
            /**
             * @TODO 这里的 preRet 其实并没有卵用...因为要求只能返回 context，所以这里的 prevRet 可以去掉
             * 但是设计上可以保留
             */
            const ret = Promise.resolve(isErrorHandler ?
                action.call(context, err, context, prevRet) : action.call(context, context, prevRet));
            // error 会被传递过来
            let catchError;
            // 因为没有 promise.finally，所以只能单独捕获异常，cache 住以后继续传递
            return ret.catch(e => {
                // 如果有异常，则 cache 住，
                catchError = e;
            }).then(v => {
                if (v !== undefined) {
                    prevRet = v;
                }
                return dispatch(i + 1, prevRet, catchError);
            });
        }
        catch (e) {
            return dispatch(i + 1, prevRet, e);
        }
    }
};
exports.execute = execute;
