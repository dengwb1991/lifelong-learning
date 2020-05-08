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

call的继承过程是通过 prototype 属性

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