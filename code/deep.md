实现如下传入参数取值效果
function get() {
  // 请补全函数参数和实现逻辑的话

}
const obj = { selector: { to: { toutiao: 'FE coder' } }, target: [1, 2, { name: 'byted' }] };// 运行代码
get(obj, 'selector.to.toutiao', 'target[0]', 'target[2].name')
//  输出结果：// ['FE coder', 1, 'byted']

```js
  function getValueByPath (obj, path) {
    let paths = path.split('.')

    let result = obj
    let key
    while (key = paths.shift()) {
      result = result[key]
    }
    return result
  }
```

* lodash.get


```js
function deepGet(object, path, defaultValue) {
    return (!Array.isArray(path) ? path.replace(/\[/g, '.').replace(/\]/g, '').split('.') : path)
            .reduce((o, k) => (o || {})[k], object) || defaultValue;
}

var obj = { 'a': [{ 'b': { 'c': 3 } }] };

var result =deepGet(obj, 'a[0].b.c');
console.log(result);
// => 3

result=deepGet(obj, ['a', '0', 'b', 'c']);
console.log(result);
// => 3

result=deepGet(obj, 'a.b.c', 'default');
console.log(result);
// => 'default'
```