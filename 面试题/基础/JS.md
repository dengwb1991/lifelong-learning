## 一、JavaScript 中数组是如何存储的？

### 数组的内存模型

Javascript的内存分为堆内存和栈内存，数组作为对象，在建立后存储在堆内存中。

1. 数组中可以存放不同的数据结构，可以存放数组、对象、Number、Undefined、Null、String、Symbol、Boolean、Function等等
2. 数组的index是字符串类型的，之所以你可以通过arr[1]，获得对应的数据，是因为Javascript自动将数字转化为字符串
3. 数组本来应该是一个连续的内存分配，但是在Javascript中不是连续分配的，而是类似哈希映射的方式存在的，对于读取操作，哈希表的效率并不高，而修改删除的效率比较高

现在浏览器为了优化其操作，对数组的创建时候的内存分配进行了优化：

1. 对于同构的数组，也就是，数组中元素类型一致，会创建连续的内存分配
2. 对于不同构数组，按照原来的方式创建
3. 如果你想插入一个异构数据，那么就会重新解构，通过哈希映射的方式创建

### ArrayBuffer

Javascript在ES6也推出了可以按照需要分配连续内存的数组，这就是[ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays)

ArrayBuffer会从内存中申请设定的二进制大小的空间，但是并不能直接操作它，需要通过ArrayBuffer构建一个视图，通过视图来操作这个内存.

我们需要创建一个缓冲区，这里是一个固定长度的16字节：

```js
let buffer = new ArrayBuffer(16)
```

我们可以查看它的字节长度 buffer.byteLength，在使用这个缓冲区之前，我们需要创建一个视图。让我们创建一个视图，将缓冲区中的数据作为一个32位有符号整数数组：

```js
let int32View = new Int32Array(buffer)
```

现在我们可以像普通数组一样访问数组中的字段：

```js
for (let i = 0; i < int32View.length; i++) {
  int32View[i] = i * 2;
}
```

最终 int32View 为 [0, 2, 4, 6]

## 二、Javascript 内存管理、堆和栈

JavaScript的内存生命周期：

1. 分配你所需要的内存
2. 使用分配到的内存（读、写）
3. 不需要时将其释放、归还（垃圾回收）

在JS中，每一个数据都需要一个内存空间。内存空间又被分为两种，栈内存(stack)与堆内存(heap)

### 堆和栈

1. 栈(stack)是有序的，主要存放一些基本类型的变量和对象的地址，每个区块按照一定次序存放（后进先出），它们都是直接按值存储在栈中的，每种类型的数据占用的内存空间的大小也是确定的，并由系统自动分配和自动释放。

因此，这样带来的好处就是，内存可以及时得到回收，相对于堆来说，更加容易管理内存空间，且寻址速度也更快。

2. 堆(heap)是没有特别的顺序的，数据可以任意存放，多用于复杂数据类型（引用类型）分配空间，例如数组对象、object对象。

其实这样说也不太准确，因为，引用类型数据的地址是存储于栈中的，当我们想要访问引用类型的值的时候，需要先从栈中获得想要访问对象的地址，然后，再通过地址指向找出堆中的所需数据。就好比书架上的书，虽然已经按顺序放好了，但我们只要知道书的名字，就可以对应的取下来。

## 三、ES5 和 ES6 继承的区别

1. ES5的继承实质上是先创建子类的实例对象，然后再将父类的方法添加到this上（Parent.apply(this)）
2. ES6的继承机制完全不同，实质上是先创建父类的实例对象this（所以必须先调用父类的super()方法），然后再用子类的构造函数修改this
3. ES5的继承时通过原型或构造函数机制来实现
4. ES6通过class关键字定义类，里面有构造方法，类之间通过extends关键字实现继承。子类必须在constructor方法中调用super方法，否则新建实例报错。因为子类没有自己的this对象，而是继承了父类的this对象，然后对其进行加工。如果不调用super方法，子类得不到this对象

ES5:

```js
function parent(a,b){
    this.a = a
    this.b = b
}
function child(c){
    this.c = c
}
parent.call(child, 1, 2)
```

call的继承过程是通过 prototype 属性 （不完全如下代码，call不会复制父类的 prototype 属性）

```js
child.prototype = new parent(1,2)
```

由此可知，ES5继承的实质是先创建了子类元素child的的实例对象，然后再把父类元素parent的原型对象中的属性赋值给子类元素child的实例对象里面，从而实现继承.

ES6:

ES6 引入了类(class)的概念, ES6 中的继承是基于类之间的继承，通过 extends 关键字，super 实例化调用父类.

```js
class parent{
　　constructor(a,b) {
　　　　this.a = a;
　　　　this.b = b;
　　}
　　parentMethods () {
　　　　return this.a + this.b
　　}
}
class child extends parent {
　　constructor (a,b,c) {
　　　　super(a, b);
　　　　this.c = c;
　　}
　　childMethods () {
　　　　return this.c + ',' + super.parentMethods()
　　}
}
const point = new child(1, 2, 3)
point.childMethods()
```

总结：

1. ES5先创建子类，在实例化父类并添加到子类this中
2. ES6先创建父类，在实例化子集中通过调用super方法访问父级后，在通过修改this实现继承

## 四、如何提升 JavaScript 变量的存储性能

一个属性或方法在原型链的位置越深，访问它的速度就越慢。解决办法就是：将经常使用的对象成员，数组项和域外的变量存入局部变量中，然后访问这个局部变量。

## 五、原型、原型链

### 原型对象 __proto__

每个JS对象一定对应一个原型对象，并从原型对象继承属性和方法.

对象__proto__属性的值就是它所对应的原型对象:

```js
var one = {x: 1};
var two = new Object();
one.__proto__ === Object.prototype // true
two.__proto__ === Object.prototype // true
one.toString === one.__proto__.toString // true
```


### 原型 prototype

prototype属性，不像每个对象都有__proto__属性来标识自己所继承的原型，只有函数才有prototype属性。

当你创建函数时，JS会为这个函数自动添加prototype属性，值是一个有 constructor 属性的对象，不是空对象。而一旦你把这个函数当作构造函数（constructor）调用（即通过new关键字调用），那么JS就会帮你创建该构造函数的实例，实例继承构造函数prototype的所有属性和方法（实例通过设置自己的__proto__指向承构造函数的prototype来实现这种继承）

### 原型链

JS正是通过__proto__和prototype的合作实现了原型链，以及对象的继承。

构造函数，通过prototype来存储要共享的属性和方法，也可以设置prototype指向现存的对象来继承该对象

对象的__proto__指向自己构造函数的prototype。obj.__proto__.__proto__...的原型链由此产生，包括我们的操作符instanceof正是通过探测obj.__proto__.__proto__... === Constructor.prototype来验证obj是否是Constructor的实例。

回到开头的代码，two = new Object()中Object是构造函数，所以two.__proto__就是Object.prototype。至于one，ES规范定义对象字面量的原型就是Object.prototype。

最后总结：先有Object.prototype（原型链顶端），Function.prototype继承Object.prototype而产生，最后，Function和Object和其它构造函数继承Function.prototype而产生。


## 六、async / await 和 Promise 的区别?

await 会等待异步代码执行，会阻塞代码（使用时要考虑性能）
async / await在调试方面会更加方便

## 七、在 JavaScript 可以有哪几种形式实现继承，各有什么优缺点？

1. 借用构造函数

在子类的构造函数中，通过 apply 或 call 的形式，调用父类构造函数，以实现继承

```js
function a () {
  this.name = 'ha'
}
a.prototype.method = () => (console.log(2))

function b () {
  a.call(this)
}

new b().method()  // Error
```

特点: **定义在prototype中的属性和方法不能继承**

2. 原型模式

利用 prototype 继承

```js
function parent () {
  this.name = 'abc'
}

function child () {
  this.age = 18
}

child.prototype = new parent()
child.prototype.constructor = child
new child().name
```

特点：**该方法可以继承prototype中的属性和方法**

3. 利用空对象间接继承

```js
function extend(Child, Parent) {
  let F = function() {};
  F.prototype = Parent.prototype;
  Child.prototype = new F();
  Child.prototype.constructor = Child;
  Child.uber = Parent.prototype; //用于访问父对象的prototype，可用可不用
}
```

4. 拷贝继承 

```js
function extend(Child, Parent) {　　　　
  var p = Parent.prototype;　　　　
  var c = Child.prototype;　　　　
  for (var i in p) {　　　　　　
      c[i] = p[i];　　　　　　
  }　　　　
  c.uber = p;　　
}
```

不需要先继承后定义