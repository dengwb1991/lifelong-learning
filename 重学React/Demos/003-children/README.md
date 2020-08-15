# 为自定义组件编写 children

## 修改 MyComponent

```js
class MyComponent extends Component {
  render () {
    return <div>
      <span id="1">Hello </span>
      <span>World! </span>
      {this.children}
    </div>
  }
}

let A = <MyComponent name='a'>
  <div>{true}</div>
</MyComponent>
```

在自定义组件内添加 `<div>{true}</div>`，并在 render 中使用 `this.children` 进行渲染，这里完全按照目前 react 书写方式.


## 修改 Component

```js
export class Component {
  constructor () {
    this.children = []
  }
  mountTo (parent) {
    let vdom = this.render()
    vdom.mountTo(parent)
  }
  setAttribute (name, value) {
    this[name] = value
  }
  appendChild (vchild) {
    this.children.push(vchild)
  }
}
```

添加 `this.children` 数组 和 appendChild 方法.

## 更新 createElement

```js
    let insertChildren = (children) => {
      for (let child of children) {
        if (typeof child === 'object' && child instanceof Array) {
          insertChildren(child)
        } else {
          if ( !(child instanceof Component) &&
            !(child instanceof ElementWrapper)) {
            child = String(child)
          }
          if (typeof child === 'string') {
            child = new TextWrapper(child)
          }
          element.appendChild(child)
        }
      }
    }
    insertChildren(children)
```

在这里创建了一个 `insertChildren` 方法，其作用就是将子元素插入到父元素，注意这里参数 children 为数组. 先进入 createElement 的 type 为 MyComponent 中的子元素 `<div>{true}</div>`， 与之前不同的是，增加了两个判断，判断如果 child 为数组时，递归调用获取其内部元素，再判断如果 child 不为自定义的 `Component` 或 `Wrapper` 的话，将其转化为 string 类型，这一步主要处理其他基本类型。