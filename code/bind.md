## bind

```js
Function.prototype.mybind = function(thisArg) {
  if (typeof this !== 'function') {
    throwTypeError("Bind must be called on a function")
  }
  const args = Array.prototype.slice.call(arguments, 1),
    self = this,
    nop = function() {},
    bound = function() {
      return self.apply(
        this instanceof nop ? this : thisArg,
        args.concat(Array.prototype.slice.call(arguments))
      )
    }

  if (this.prototype) {
    nop.prototype = this.prototype
  }
  bound.prototype = new nop()

  return bound
}
```

## 分解步骤

```js
Function.prototype.mybind = function(thisArg) {
  if (typeof this !== 'function') {
    throwTypeError("Bind must be called on a function")
  }
  // 拿到参数，为了传给调用者
  const args = Array.prototype.slice.call(arguments, 1),
    // console.log('1. args', args, arguments)
    // 保存 this
    self = this,
    // 构建一个干净的函数，用于保存原函数的原型
    nop = function() {},
    // 绑定的函数
    bound = function() {
      // this instanceof nop, 判断是否使用 new 来调用 bound
      // 如果是 new 来调用的话，this的指向就是其实例，
      // 如果不是 new 调用的话，就改变 this 指向到指定的对象 o
      // `args.concat(Array.prototype.slice.call(arguments))` 主要作用将参数传给调用者
      // console.log('2. this instanceof nop', this instanceof nop)
      // console.log('3. Array.prototype.slice.call(arguments)', 
      return self.apply(
        this instanceof nop ? this : thisArg,
        args.concat(Array.prototype.slice.call(arguments))
      )
    }

  // 箭头函数没有 prototype，箭头函数this永远指向它所在的作用域
  // console.log('4. this.prototype', this.prototype)
  if (this.prototype) {
    nop.prototype = this.prototype
  }
  // 修改绑定函数的原型指向
  bound.prototype = new nop()

  return bound
}
```

## 测试

```js
var bar = function() {
  console.log(this.name, arguments)
}

bar.prototype.name = 'bar'

var foo = {
  name: 'foo'
}

const bound = bar.mybind(foo, 22, 33, 44) // ƒ
// 1. args: [22, 33, 44], Arguments[{ name: 'foo' }, 22, 33, 44]
// 4. this.prototype: {name: "bar", constructor: ƒ}

new bound() // bar, [22, 33, 44]
// 2. this instanceof nop: true
// 3. Array.prototype.slice.call(arguments), []

bound() // foo, [22, 33, 44]
// 2. this instanceof nop: false
// 3. Array.prototype.slice.call(arguments), []
```

## call

```js
Function.prototype.myCall = function(context){ 
    if(typeof this !== 'function'){
        throw new TypeError('this is not a function')
    }
    context.fn = this;
    var arr = [];
    for(var i = 1; i< arguments.length; i++){
        arr.push('argument[' + i + ']')
    }
    var result = eval('context.fn(' +arr+ ')');
    delete context.fn;
    return result;
}
```

## apply

```js
Function.prototype.myApply = function(context,arr){ 
    if(typeof this != 'function'){
        throw new TypeError('this is not a function')
    }
    context.fn = this;
    var result= [];
    if(!arr){
        result = context.fn()
    }else{
        var args = [];
        for(var i = 1; i< arr.length; i++){
            args.push('arr[' + i + ']')
        }
        result = eval('context.fn(' +args+ ')');
    }
    delete context.fn;
    return result;
}
```