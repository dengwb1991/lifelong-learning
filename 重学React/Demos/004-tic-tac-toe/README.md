# tic tac toe

## 实现 this.props

1. 定义 class

```js
class Square extends Component {
  render() {
    return (
      <button className="square">
        {this.props.value}
      </button>
    )
  }
}

class Board extends Component {
  renderSquare(i) {
    return <Square value={i}/>
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
```

分别创建 Square 和 Board，Square 中返回 `button` 其内容为 `this.props.value`

2. 修改 Component

```js
export class Component {
  constructor () {
    this.children = []
    this.props = Object.create(null)
  }
  mountTo (parent) {
    let vdom = this.render()
    vdom.mountTo(parent)
  }
  setAttribute (name, value) {
    this.props[name] = value
    this[name] = value
  }
  appendChild (vchild) {
    this.children.push(vchild)
  }
}
```

在构造函数里创建 this.props 对象，在 setAttribute 方法里将name 和 value 赋值给 props.

* Object.create(null) 创建对象，该对象不会默认带入 toString() 等方法.

## 添加 click 事件

1. 为 button 添加 click 事件

```js
class Square extends Component {
  render() {
    return (
      <button className="square" onClick={() => alert('click')}>
        {this.props.value}
      </button>
    )
  }
}
```

2. 事件会以 attributes 传入 createElement 方法，修改其 setAttribute 方法

```js
  setAttribute (name, value) {
    if (name.match(/^on([\s\S]*)$/)) {
      let eventName = RegExp.$1.replace(/^[\s\S]/, s => s.toLocaleLowerCase())
      this.root.addEventListener(eventName, value)
    }
    this.root.setAttribute(name, value)
  }
```

判断 name 是否以 on 开头，请进行分割获取 `click`，使用 `addEventListener` 方法进行事件绑定。

## 实现 className 生效

依然修改 setAttribute 方法，判断 name 是否等于 `className` 并将其修改为 `class`

## 实现 this.setState

```js
class Square extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: null
    }
  }
  render() {
    return (
      <button className="square" onClick={() => this.setState({ value: 'X' })}>
        {this.props.value}
      </button>
    )
  }
}
```

在 Component 新增 setState 方法.

```js
  setState (state) {
    let merge = (oldState, newState) => {
      for (let p in newState) {
        if (typeof newState[p] === 'object') {
          if (typeof oldState[p] !== 'object') {
            oldState = {}
          }
          merge(oldState[p], newState[p])
        } else {
          oldState[p] = newState[p]
        }
      }
    }
    if (!this.state && state) {
      this.state = {}
    }
    merge(this.state, state)
  }
```

this.state 默认为一个对象，思路是将新的值 merge 老的state里

* 这里有一个问题 this.setState({ value: { val: 3 } }) 将会报错 可以直接使用 Object.assign()