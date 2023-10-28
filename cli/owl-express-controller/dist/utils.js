"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isArrayLike = exports.isFunction = exports.isPromise = exports.resolveRoutePath = exports.hyphenate2Path = exports.camelCase2Path = exports.readDirFile = exports.createDebug = void 0;
const fs = require("fs");
const path = require("path");
const d = require("debug");
/**
 * 生成 debug
 * @param namespace
 */
const createDebug = (namespace) => {
    return d(`controller:${namespace}`);
};
exports.createDebug = createDebug;
/**
 * 循环解析目录，返回文件绝对路径和文件对应的 uri
 * @param dir
 * @param filter
 * @param baseDirs - 基础根路径，一般来说并不需要使用
 */
const readDirFile = (dir, filter, baseDirs = []) => {
    let results = new Array();
    const list = fs.readdirSync(dir);
    const pending = list.length;
    if (!pending)
        return [];
    list.forEach((file) => {
        if (filter && filter.test(file)) {
            return;
        }
        const filePath = path.resolve(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat((0, exports.readDirFile)(filePath, filter, baseDirs.concat(file)));
        }
        else {
            results.push({
                path: filePath,
                /**
                 * 去 ext 后缀
                 * example/index-controller.ts => example/empty/index-controller
                 */
                uri: baseDirs.join('/'),
            });
        }
    });
    return results;
};
exports.readDirFile = readDirFile;
/**
 * 驼峰转 url path
 * @example exampleTest => example/test
 * @param str
 */
const camelCase2Path = (str) => {
    return str.replace(/([A-Z])/g, '/$1').toLowerCase();
};
exports.camelCase2Path = camelCase2Path;
/**
 * 驼峰转连字符 url
 * @param str
 */
const hyphenate2Path = (str) => {
    return str.replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase();
};
exports.hyphenate2Path = hyphenate2Path;
/**
 * 拼接路由 path
 * @param paths
 */
const resolveRoutePath = (...paths) => {
    return paths.join('');
};
exports.resolveRoutePath = resolveRoutePath;
const isPromise = (e) => {
    return e instanceof Promise || (!!e && typeof e.then == 'function');
};
exports.isPromise = isPromise;
const isFunction = (f) => {
    return typeof f === 'function';
};
exports.isFunction = isFunction;
const MAX_SAFE_INTEGER = 9007199254740991;
function isLength(value) {
    return typeof value == 'number' &&
        value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
/**
 * 判断是否是 arrayLike，参考 lodash
 * @param value
 */
const isArrayLike = (value) => {
    return value != null && typeof value != 'function' && isLength(value.length);
};
exports.isArrayLike = isArrayLike;
