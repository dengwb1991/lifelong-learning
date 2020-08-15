# 实现渲染自定义 class 组件

```js
import { OwlReact } from './OwlReact.js'

class MyComponent {
  mountTo (parent) {
    let vdom = this.render()
    vdom.mountTo(parent)
  }
  setAttribute (name, value) {
    this[name] = value
  }
  render () {
    return <div>
      <span id="1">Hello </span>
      <span>World! </span>
    </div>
  }
}

let A = <MyComponent name='a'/>

OwlReact.render(A, document.body)
```

自定义了 `MyComponent` class, 在 `OwlReact` 添加了 render 方法, 将 `MyComponent` 传入.

最终执行 `mountTo(parent)` 执行 document.body.appendChild(vdom) 将 dom 插入 body.

## 更新 OwlReact

```js
export let OwlReact = {
  createElement (type, attributes, ...children) {
    let element
    // console.log(type, attributes, children)
    if (typeof type === 'string')
      element = new ElementWrapper(type)
    else
      element = new type

    for (let name in attributes) {
      element.setAttribute(name, attributes[name])
    }

    for (let child of children) {
      if (typeof child === 'string') {
        child = new TextWrapper(child)
      }
      element.appendChild(child)
    }
    return element
  },
  render (vdom, element) {
    vdom.mountTo(element)
  }
}
```

新增了 `render(vdom, element)` 方法，这里也就是在 index.js 中被 OwlReact.render 调用.

createElement 被调用 4 次. 依次打印 type、attributes、children 如下：

```js
ƒ MyComponent() {
    _classCallCheck(this, MyComponent);

    return _super.apply(this, arguments);
  } {name: "a"} []

span {id: "1"} ["Hello "]

span null ["World! "]

div null (2) [ElementWrapper, ElementWrapper]
```

先解析自定义class、再依次从子节点到根节点逐步解析。

## 封装使用 Wrapper

与之前不同的是，将 document.createElement 替换为 ElementWrapper，document.createTextNode 替换为 TextWrapper. 查看 OwlReact.createElement 中调用了其哪些方法，将这些方法在 Wrapper 中实现。

```js
class ElementWrapper {
  constructor (type) {
    this.root = document.createElement(type)
  }
  setAttribute (name, value) {
    this.root.setAttribute(name, value)
  }
  appendChild (vchild) {
    vchild.mountTo(this.root)
  }
  mountTo (parent) {
    parent.appendChild(this.root)
  }
}

class TextWrapper {
  constructor (content) {
    this.root = document.createTextNode(content)
  }
  mountTo (parent) {
    parent.appendChild(this.root)
  }
}
```

## 代码中三个 mountTo 的作用

1. TextWrapper 的 mountTo

```js
  mountTo (parent) {
    parent.appendChild(this.root)
  }
```

这里的 this.root 是文本，例如代码中 span 标签中的部分。 若将其删除的话 不会展示 Hello World。 页面中只有 div、和 span

2. ElementWrapper 的 mountTo

```js
  mountTo (parent) {
    parent.appendChild(this.root)
  }
```

这里的 this.root 是dom节点，若将其删除的话 不会展示任何dom结构。

3. Component 的 mountTo

```js
  mountTo (parent) {
    let vdom = this.render()
    vdom.mountTo(parent)
  }
```

vdom 为 ElementWrapper 内保存着所有的子元素和其属性值，parent 为 body，最终执行一遍 ElementWrapper 的 mountTo，也就是 parent.appendChild(this.root)。

## 解析执行顺序

1. 解析 MyComponent，进入 OwlReact.createElement, 此时 type、attributes、children 如下

```js
ƒ MyComponent() {
    _classCallCheck(this, MyComponent);

    return _super.apply(this, arguments);
  }
  
{name: "a"}

[]
```

2. 执行 OwlReact.render 方法，此时 vdom 为 MyComponent，element 为 body。
3. 解析 dom，再次调用 OwlReact.createElement，解析 第一个 `span` 标签，`<span id="1">Hello </span>`，然后会调用 `ElementWrapper.appendChild` 方法，参数vichild为 `TextWrapper`，再执行 `TextWrapper.mountTo` 方法将 Hello 添加到 `span` 标签中. 再次过程中依然会判断 attributes 并将属性添加其中。
4. 同第3步，再次 OwlReact.createElement，解析 第二个 `span` 标签. 过程与第3步一致。
5. 最后解析 `div` 元素，此时调用 OwlReact.createElement，其 type 为 `div`, children 为 `[ElementWrapper, ElementWrapper]` 包含 `span` 元素的数组，执行 `ElementWrapper.appendChild` 方法，此时参数vchild 为 `ElementWrapper`，再次调用其 `mountTo` 方法时将当前的 `div` 传入，会调用其 `ElementWrapper.mountTo`，最终将 `span` 标签添加到 `div` 标签内。因为有两个 span 此过程会重复循环两次.
6. 最后会执行 `Component.mountTo` 方法，`vdom` 为完整的 div-span 结构的 `ElementWrapper`，`parent` 为 body. 最终调用其 mountTo 方法，将其 div-span 结构 添加到 body.