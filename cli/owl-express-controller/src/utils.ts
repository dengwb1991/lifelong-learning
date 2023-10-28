import * as fs from 'fs'
import * as path from 'path'
import * as d from 'debug'

/**
 * 生成 debug
 * @param namespace 
 */
export const createDebug = (namespace: string) => {
  return d(`controller:${namespace}`)
}

/**
 * 循环解析目录，返回文件绝对路径和文件对应的 uri
 * @param dir 
 * @param filter 
 * @param baseDirs - 基础根路径，一般来说并不需要使用
 */
export const readDirFile = (dir: string, filter?: RegExp, baseDirs: string[] = []): Array<{ path: string, uri: string }> => {
  let results = new Array<{ path: string, uri: string }>()
  const list: string[] = fs.readdirSync(dir)
  const pending = list.length
  if (!pending) return []
  list.forEach((file: string): void => {
    if (filter && filter.test(file)) {
      return
    }
    const filePath = path.resolve(dir, file)
    const stat = fs.statSync(filePath)
    if (stat && stat.isDirectory()) {
      results = results.concat(
        readDirFile(filePath, filter, baseDirs.concat(file)),
      )
    } else {
      results.push({
        path: filePath,
        /**
         * 去 ext 后缀
         * example/index-controller.ts => example/empty/index-controller
         */
        uri: baseDirs.join('/'),
      })
    }
  })
  return results
}


/**
 * 驼峰转 url path
 * @example exampleTest => example/test
 * @param str 
 */
export const camelCase2Path = (str: string) => {
  return str.replace(/([A-Z])/g, '/$1').toLowerCase()
}

/**
 * 驼峰转连字符 url
 * @param str 
 */
export const hyphenate2Path = (str: string) => {
  return str.replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase()
}

/**
 * 拼接路由 path
 * @param paths 
 */
export const resolveRoutePath = (...paths: string[]) => {
  return paths.join('')
}


export const isPromise = (e: any) => {
  return e instanceof Promise || (!!e && typeof e.then == 'function')
}

export const isFunction = (f: any) => {
  return typeof f === 'function'
}

const MAX_SAFE_INTEGER = 9007199254740991

function isLength(value: any) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER
}

/**
 * 判断是否是 arrayLike，参考 lodash
 * @param value 
 */
export const isArrayLike = (value: any) => {
  return value != null && typeof value != 'function' && isLength(value.length)
}
