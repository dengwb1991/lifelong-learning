```js
// 简单实现 promise.all
const PromiseAll = arr => {
  let result = []
  return new Promise((resolve) => {
    let i = 0
    const next = () => {
      const _promise = Object.prototype.toString.call(arr[i]) === '[object Function]' ? arr[i]() : arr[i]
      _promise.then(res => {
        result.push(res)
        i++
        if (i === arr.length) {
          resolve(result)
        } else {
          next()
        }
      })
    }
    next()
  })
}
```