```js
var compose = (...funcs) => {
  if (funcs.length === 0) {
    return arg => arg
  }
  if (funcs.length === 1) {
    return funcs[0]
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
```

测试：

```js
var fn1 = (num) => num + 1
var fn2 = (num) => num + 2
var fn3 = (num) => num + 3

var result = compose(fn1, fn2, fn3) // 执行顺序从右到左 fn1(fn2(fn3()))

result(1) // 7
```

还原：

```js
var compose = function() {
  const args = [].slice.apply(arguments)
  return function(x) {
    return args.reduce((res, cb) => cb(res), x)
  }
}
```


不用reduce

```js
function compose() {
    var fns = [].slice.call(arguments)
    return function (initialArg) {
        var res = initialArg
        for (var i = fns.length - 1; i > -1; i--) {
            res = fns[i](res)
        }
        return res
    }
}
```