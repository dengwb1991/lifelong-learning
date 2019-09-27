// 定时器
const sleep = (data, ms) => new Promise((resolve) => setTimeout(() => {
  console.log(data)
  resolve(data)
}, ms))

const p1 = () => sleep('p1', 2000)
const p2 = () => sleep('p2', 1000)
const p3 = () => sleep('p3', 3000)

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

// 并行
let startTime1 = new Date().getTime()
PromiseAll([p1(), p2(), p3()]).then(data => { // `p1()` is Promise
  let endTime1 = new Date().getTime()
  console.log('time:', endTime1 - startTime1) // 3000
  console.log(data) // [p1, p2, p3]
})

// 串行
let startTime2 = new Date().getTime()
PromiseAll([p1, p2, p3]).then(data => {
  let endTime2 = new Date().getTime()
  console.log('time:', endTime2 - startTime2) // 6000
  console.log(data) // [p1, p2, p3]
})

// reduce 串行
[p1, p2, p3].reduce((prev, curr) => prev.then(() => curr()), Promise.resolve())


// queue 顺序执行
const PromiseQueue = arr => {
  let sequence = Promise.resolve()
  arr.forEach(function (item) {
    sequence = sequence.then(item)
  })
  return sequence
}

PromiseQueue([p1, p2, p3]).then(data => console.log(data))