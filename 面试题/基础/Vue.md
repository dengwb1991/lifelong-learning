## 一、Vue.js 实现原理

1. 创建 Vue 实例对象;
2. `init`过程会初始化生命周期，初始化事件中心，初始化渲染、执行`beforeCreate`周期函数、初始化 `data`、`props`、`computed`、`watcher`、执行`created`周期函数等;
3. 初始化后，调用`$mount`方法对Vue实例进行挂载（挂载的核心过程包括模板编译、渲染以及更新三个过程）。
4. 如果没有在 Vue 实例上定义`render`方法而是定义了`template`，那么需要经历编译阶段。需要先将`template` 字符串编译成 `render function`，`template` 字符串编译步骤如下 ：

* `parse`正则解析template字符串形成 AST（抽象语法树，是源代码的抽象语法结构的树状表现形式）
* `optimize`标记静态节点跳过 DIFF 算法（DIFF 算法是逐层进行比对，只有同层级的节点进行比对，因此时间的复杂度只有 O(n)
* `generate`将 AST 转化成`render function`字符串

5. 编译成`render function`后，调用`$mount`的`mountComponent`方法，先执行`beforeMount`钩子函数，然后核心是实例化一个渲染`Watcher`，在它的回调函数（初始化的时候执行，以及组件实例中监测到数据发生变化时执行）中调用`updateComponent`方法（此方法调用`render`方法生成虚拟 Node，最终调用`update`方法更新 DOM）。
6. 调用render方法将render function渲染成虚拟的DOM（真正的 DOM 元素是非常庞大的，因为浏览器的标准就把 DOM 设计的非常复杂。如果频繁的去做 DOM 更新，会产生一定的性能问题，而 Virtual DOM 就是用一个原生的 JavaScript 对象去描述一个 DOM 节点，所以它比创建一个 DOM 的代价要小很多，而且修改属性也很轻松，还可以做到跨平台兼容），render方法的第一个参数是createElement(或者说是h函数)，这个在官方文档也有说明。
7. 生成虚拟 DOM 树后，需要将虚拟 DOM 树转化成真实的 DOM 节点，此时需要调用update方法，update方法又会调用pacth方法把虚拟 DOM 转换成真正的 DOM 节点。需要注意在图中忽略了新建真实 DOM 的情况（如果没有旧的虚拟 DOM，那么可以直接通过createElm创建真实 DOM 节点），这里重点分析在已有虚拟 DOM 的情况下，会通过sameVnode判断当前需要更新的 DOM节点是否和旧的 DOM 节点相同（例如我们设置的key属性发生了变化，那么节点显然不同），如果节点不同那么将旧节点采用新节点替换即可，如果相同且存在子节点，需要调用patchVNode方法执行 DIFF 算法更新 DOM，从而提升 DOM 操作的性能。

响应式流程：

1. 在`init`的时候会利用`Object.defineProperty`方法（不兼容 IE8）监听Vue实例的响应式数据的变化从而实现数据劫持能力（利用了 JavaScript 对象的访问器属性`get`和`set`，在未来的 Vue3 中会使用 ES6 的Proxy来优化响应式原理）。在初始化流程中的编译阶段，当`render function`被渲染的时候，会读取Vue实例中和视图相关的响应式数据，此时会触发`getter`函数进行**依赖收集**（将观察者`Watcher`对象存放到当前闭包的订阅者`Dep`的`subs`中），此时的数据劫持功能和观察者模式就实现了一个 MVVM 模式中的 **Binder**，之后就是正常的渲染和更新流程。
2. 当数据发生变化或者视图导致的数据发生了变化时，会触发数据劫持的`setter`函数，`setter`会通知初始化**依赖收集**中的`Dep`中的和视图相应的`Watcher`，告知需要重新渲染视图，`Watcher`就会再次通过`update`方法来更新视图。

## 二、vue-router Hash 和 History

Hash模式：利用url的hash(#)，javascript通过hashChange事件来监听url的变化，改变 hash 不会重新加载页面.

History模式：利用 HTML5 History Interface 中新增的 pushState() 和 replaceState() 方法.通过监听 popState 事件


## 三、vue3

1. Proxy

Vue 2 是通过替换状态对象属性的 getter 和 setter 来实现这种响应能力的。转向 Proxy 后，我们就能解决 Vue 当下存在的诸多局限（比如无法检测新增属性等），还能提供更好的性能.

但 Proxy 是一个原生的语言特性，无法在老式浏览器中提供完整的 polyfill。为此我们需要改动新版框架的浏览器支持范围——这是一项破坏性变更，只有新的主要版本才能实现。

Proxy可以直接监听对象和数组的变化，并且有多达13种拦截方法。并且作为新标准将受到浏览器厂商重点持续的性能优化。

Proxy 判断当前Reflect.get的返回值是否为Object，如果是则再通过reactive方法做代理， 这样就实现了深度观测.


2. 转向 TypeScript

3. 解耦内部包

框架是由众多内部包组成的，每个包都有自己独立的 API、类型定义和测试用例

4. 突破虚拟 DOM 的瓶颈

Vue 3 的CPU 时间仅为 Vue 2 的十分之一不到

5. 缩小包体积

在 Vue 3 中，我们把大多数全局 API 和内部 helper 移到了 ES 模块导出中，从而实现了这个目标。这样现代的打包器就可以静态分析模块依赖项，并去掉与未使用导出相关的代码。模板编译器也会生成适合摇树优化的代码，只会对模板确实用到的特性导入 helper。
框架的有些部分是永远无法摇树优化的，因为它们对于所有应用类型来说都很重要。我们将这部分无法舍弃的代码的体积称作基线大小。虽然 Vue 3 增加了很多新特性，但其基线大小只有大约 10KB（gzip 后），不到 Vue 2 的一半。

6. 满足扩展需求

受到 React Hooks 的启发，我们想到了暴露底层的响应式和组件生命周期的 API，从而提供一种更灵活地编写组件逻辑的方式，也就是 Composition API 。Composition API 不再需要用一个长长的配置列表定义组件，它允许用户自由定义、组合和重用组件逻辑，就像写函数一样，同时还能提供完善的 TypeScript 支持。

7. 把握平衡

新手可以通过 CDN script、基于 HTML 的模板以及直观的 Options API 顺利学习入门。而专家可以通过全功能的 CLI、渲染函数以及 Composition API 来处理复杂需求。



## 四、Vue.js 中的数据劫持是怎么实现的？

针对 Object 类型，采用 Object.defineProperty() 方法劫持属性的 get 和 set 方法

针对 Array 类型，采用原型相关的知识劫持常用的函数，从而知晓当前数组发生变化

采用 Vue.set() 方法设置数组元素时，Vue 内部实际上是调用劫持后的 splice() 方法来触发更新。

## 五、vuex 中 action 和 mutation 区别

源码中 action 通过 dispatch 方法、mutation 通过 commit 方法提交.

### 为什么 action 不能修改 state

当某种类型的 action 只有一个声明时，action 的回调会被当做普通函数执行，如果有多个声明时，它们会被视为 Promise 实例，并用 Promise.all 执行。因为不能保证顺序，所以最后并不知道哪个action 修改了 state.

在开发模式中，store通过$watch 监听 state, 通过断言（assert）监听 store._committing 标志位，mutation 会修改这个表示位，而 action 并不会进行修改，默认为 true. 所以会报错。但在生产模式并不会进行判断，如果 action 的声明为唯一的话，可以对 state 进行修改。

### 为什么 Vuex 会使用 Promise.all 执行 action

出于性能考虑，这样我们就可以最大限度进行异步操作并发

补充：mutation 不能进行异步操作、action 可以异步操作

## 六、vue2.x中如何监测数组变化

使用了函数劫持的方式，重写了数组的方法，Vue将data中的数组进行了原型链重写，指向了自己定义的数组原型方法。这样当调用数组api时，可以通知依赖更新。如果数组中包含着引用类型，会对数组中的引用类型再次递归遍历进行监控。这样就实现了监测数组变化。

## 七、nextTick 实现原理

在下次 DOM 更新循环结束之后执行延迟回调。nextTick主要使用了宏任务和微任务。根据执行环境分别尝试采用

Promise、MutationObserver、setImmediate、setTimeout

定义了一个异步方法，多次调用nextTick会将方法存入队列中，通过这个异步方法清空当前队列。

在源码中 nextTick 先判断浏览器是否支持 微任务（Promise、MutationObserver），支持则使用若不支持则使用宏任务（setImmediate、setTimeout）

```js
let microTimerFunc
let macroTimerFunc
let useMacroTask = false

/* 对于宏任务(macro task) */
// 检测是否支持原生 setImmediate(高版本 IE 和 Edge 支持)
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = () => {
    setImmediate(flushCallbacks)
  }
} 
// 检测是否支持原生的 MessageChannel
else if (typeof MessageChannel !== 'undefined' && (
  isNative(MessageChannel) ||
  // PhantomJS
  MessageChannel.toString() === '[object MessageChannelConstructor]'
)) {
  const channel = new MessageChannel()
  const port = channel.port2
  channel.port1.onmessage = flushCallbacks
  macroTimerFunc = () => {
    port.postMessage(1)
  }
} 
// 都不支持的情况下，使用setTimeout
else {
  macroTimerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}

/* 对于微任务(micro task) */
// 检测浏览器是否原生支持 Promise
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve()
  microTimerFunc = () => {
    p.then(flushCallbacks)
  }
} 
// 不支持的话直接指向 macro task 的实现。
else {
  // fallback to macro
  microTimerFunc = macroTimerFunc
}
```

执行回调队列、核心函数 nextTick

```js
const callbacks = []   // 回调队列
let pending = false    // 异步锁

// 执行队列中的每一个回调
function flushCallbacks () {
  pending = false     // 重置异步锁
  // 防止出现nextTick中包含nextTick时出现问题，在执行回调函数队列前，提前复制备份并清空回调函数队列
  const copies = callbacks.slice(0)
  callbacks.length = 0
  // 执行回调函数队列
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

export function nextTick (cb?: Function, ctx?: Object) {
  let _resolve
  // 将回调函数推入回调队列
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  // 如果异步锁未锁上，锁上异步锁，调用异步函数，准备等同步函数执行完后，就开始执行回调函数队列
  if (!pending) {
    pending = true
    if (useMacroTask) {
      macroTimerFunc()
    } else {
      microTimerFunc()
    }
  }
  // 如果没有提供回调，并且支持Promise，返回一个Promise
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}
```

## 八、Vue的生命周期

1. beforeCreate是new Vue()之后触发的第一个钩子，在当前阶段data、methods、computed以及watch上的数据和方法都不能被访问。
2. created在实例创建完成后发生，当前阶段已经完成了数据观测，也就是可以使用数据，更改数据，在这里更改数据不会触发updated函数。可以做一些初始数据的获取，在当前阶段无法与Dom进行交互，如果非要想，可以通过vm.$nextTick来访问Dom。
3. beforeMount发生在挂载之前，在这之前template模板已导入渲染函数编译。而当前阶段虚拟Dom已经创建完成，即将开始渲染。在此时也可以对数据进行更改，不会触发updated。
4. mounted在挂载完成后发生，在当前阶段，真实的Dom挂载完毕，数据完成双向绑定，可以访问到Dom节点，使用$refs属性对Dom进行操作。
5. beforeUpdate发生在更新之前，也就是响应式数据发生更新，虚拟dom重新渲染之前被触发，你可以在当前阶段进行更改数据，不会造成重渲染。
6. updated发生在更新完成之后，当前阶段组件Dom已完成更新。要注意的是避免在此期间更改数据，因为这可能会导致无限循环的更新。
7. beforeDestroy发生在实例销毁之前，在当前阶段实例完全可以被使用，我们可以在这时进行善后收尾工作，比如清除计时器。
8. destroyed发生在实例销毁之后，这个时候只剩下了dom空壳。组件已被拆解，数据绑定被卸除，监听被移出，子实例也统统被销毁。

## 九、组件中的data为什么是一个函数

一个组件被复用多次的话，也就会创建多个实例。本质上，这些实例用的都是同一个构造函数。如果data是对象的话，对象属于引用类型，会影响到所有的实例。所以为了保证组件不同的实例之间data不冲突，data必须是一个函数。

## 十、Vue2.x和Vue3.x渲染器的diff算法

diff 算法过程

1. 同级比较，再比较子节点
2. 先判断一方有子节点一方没有子节点的情况(如果新的children没有子节点，将旧的子节点移除)
3. 比较都有子节点的情况(核心diff)
4. 递归比较子节点

正常Diff两个树的时间复杂度是O(n^3)，但实际情况下我们很少会进行跨层级的移动DOM，所以Vue将Diff进行了优化，从O(n^3) -> O(n)，只有当新旧children都为多个子节点时才需要用核心的Diff算法进行同层级比较。

Vue2的核心Diff算法采用了双端比较的算法，同时从新旧children的两端开始进行比较，借助key值找到可复用的节点，再进行相关操作。相比React的Diff算法，同样情况下可以减少移动节点次数，减少不必要的性能损耗，更加的优雅。

Vue3.x借鉴了 ivi算法和 inferno算法

在创建VNode时就确定其类型，以及在mount/patch的过程中采用位运算来判断一个VNode的类型，在这个基础之上再配合核心的Diff算法，使得性能上较Vue2.x有了提升。(实际的实现可以结合Vue3.x源码看。)
该算法中还运用了动态规划的思想求解最长递归子序列。

## 十一、虚拟Dom以及key属性的作用

由于在浏览器中操作DOM是很昂贵的。频繁的操作DOM，会产生一定的性能问题。这就是虚拟Dom的产生原因。

Vue2的Virtual DOM借鉴了开源库snabbdom的实现。

Virtual DOM本质就是用一个原生的JS对象去描述一个DOM节点。是对真实DOM的一层抽象。(也就是源码中的VNode类，它定义在src/core/vdom/vnode.js中。)

key的作用是尽可能的复用 DOM 元素。

新旧 children 中的节点只有顺序是不同的时候，最佳的操作应该是通过移动元素的位置来达到更新的目的。

需要在新旧 children 的节点中保存映射关系，以便能够在旧 children 的节点中找到可复用的节点。key也就是children中节点的唯一标识。

## 十二、keep-alive

keep-alive可以实现组件缓存，当组件切换时不会对当前组件进行卸载。

常用的两个属性include/exclude，允许组件有条件的进行缓存。

两个生命周期activated/deactivated，用来得知当前组件是否处于活跃状态。

keep-alive的中还运用了LRU(Least Recently Used)算法。

## 十三、Vue中组件生命周期调用顺序

组件的调用顺序都是先父后子,渲染完成的顺序是先子后父。

组件的销毁操作是先父后子，销毁完成的顺序是先子后父。

## 十四、Vue 优化方向

编码阶段

1. 尽量减少data中的数据，data中的数据都会增加getter和setter，会收集对应的watcher
2. v-if和v-for不能连用
3. 如果需要使用v-for给每项元素绑定事件时使用事件代理


打包优化

1. Tree Shaking/Scope Hoisting
2. 使用cdn加载第三方模块
3. 多线程打包happypack
4. splitChunks抽离公共文件
5. sourceMap优化

