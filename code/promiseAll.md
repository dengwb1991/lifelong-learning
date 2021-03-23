```js

var p1 = () => new Promise((resolve, reject) => setTimeout(() => resolve('p1'), 1000))
var p2 = () => new Promise((resolve, reject) => setTimeout(() => resolve('p2'), 2000))
var p3 = () => new Promise((resolve, reject) => setTimeout(() => resolve('p3'), 3000))
var p4 = () => new Promise((resolve, reject) => setTimeout(() => resolve('p4'), 4000))

// 简单实现 promise.all
var PromiseAll = arr => {
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

PromiseAll([p1, p2, p3, p4]).then(res => {
  console.log(res)
})
```

* 并发任务队列 限制并发数量

```js
function poll (max, tasks) {
  this.tasks = tasks // 任务队列  
  this.max = max || 5 // 最大并发数  
  this.run()  
}

poll.prototype.run = function (next) { // 执行队列
  if (this.tasks.length === 0){ // 判断是否还有任务  
    return 
  }
  if (next) { // 一个萝卜一个坑
    this.do(this.tasks.shift())
  } else {
    // 第一次多任务执行
    let min = Math.min(this.tasks.length, this.max)
    let tasks = this.tasks.splice(0, min)
    for (task of tasks) {
      this.do(task)
    }
  }
}

poll.prototype.do = function (task) { // 执行任务
  task().then((res) => { 
    console.log(res)  
  }).finally(() => {
    this.run(true)
  })
}

// 创建多个 异步任务 可修改延迟时间
var p1 = () => new Promise((resolve, reject) => setTimeout(() => resolve('p1'), 3000))
var p2 = () => new Promise((resolve, reject) => setTimeout(() => resolve('p2'), 1000))
var p3 = () => new Promise((resolve, reject) => setTimeout(() => resolve('p3'), 2000))
var p4 = () => new Promise((resolve, reject) => setTimeout(() => resolve('p4'), 7000))
var p5 = () => new Promise((resolve, reject) => setTimeout(() => resolve('p5'), 1000))
var p6 = () => new Promise((resolve, reject) => setTimeout(() => resolve('p6'), 500))
new poll(3, [p1, p2, p3, p4, p5, p6])
```


```js
// 测试
var p1 = () => new Promise((resolve, reject) => setTimeout(() => resolve('p1'), 1000))
var p2 = () => new Promise((resolve, reject) => setTimeout(() => resolve('p2'), 2000))
var p3 = () => new Promise((resolve, reject) => setTimeout(() => resolve('p3'), 300))
var p4 = () => new Promise((resolve, reject) => setTimeout(() => resolve('p4'), 4000))

var arr = [p1, p2, p3, p4]
for (item of arr) {
  item().then(res => {
    console.log(res)
  })
}
```