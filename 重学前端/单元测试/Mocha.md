# Mocha

mocha 是一个功能丰富的前端测试框架。所谓"测试框架"，就是运行测试的工具。通过它，可以为JavaScript应用添加测试，从而保证代码的质量。mocha 既可以基于 Node.js 环境运行 也可以在浏览器环境运行。

[官网](https://mochajs.org/#examples)

[github](https://github.com/mochajs/mocha)

> Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun. Mocha tests run serially, allowing for flexible and accurate reporting, while mapping uncaught exceptions to the correct test cases

## 安装

```
$ npm install --global mocha

// or

$ npm install --save-dev mocha
```

## 示例

```js
// test.js

var assert = require('assert')
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1)
    })
  })
})

```

测试：

```bash
$ mocha test.js

  Array
    #indexOf()
      ✓ should return -1 when the value is not present


  1 passing (8ms)

```