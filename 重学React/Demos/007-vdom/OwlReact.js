class ElementWrapper {
  constructor (type) {
    this.type = type
    this.props = Object.create(null)
    this.children = []
    // this.root = document.createElement(type)
  }
  setAttribute (name, value) {
    this.props[name] = value
    // if (name.match(/^on([\s\S]*)$/)) {
    //   let eventName = RegExp.$1.replace(/^[\s\S]/, s => s.toLocaleLowerCase())
    //   this.root.addEventListener(eventName, value)
    // }
    // if (name === 'className') {
    //   name = 'class'
    // }
    // this.root.setAttribute(name, value)
  }
  appendChild (vchild) {
    // this.children.push(vchild)
    this.children.push(vchild.vdom)
    // const range = document.createRange()
    // const element = this.root
    // if (element.children.length) {
    //   range.setStartAfter(element.lastChild)
    //   range.setEndAfter(element.lastChild)
    // } else {
    //   range.setStart(element, 0)
    //   range.setEnd(element, 0)
    // }
    // vchild.mountTo(range)
  }
  get vdom () {
    return this
  }
  mountTo (range, bool) {
    this.range = range

    function hack(range) {
      const placeholder = document.createComment('place-holder')
      const r = document.createRange()
      r.setStart(range.endContainer, range.endOffset)
      r.setEnd(range.endContainer, range.endOffset)
      r.insertNode(placeholder)
      if (bool) {
        placeholder.parentNode.removeChild(placeholder)
      }
    }
    hack(this.range)

    range.deleteContents()
    let element = document.createElement(this.type)
    for (let name in this.props) {
      let value = this.props[name]
      if (name.match(/^on([\s\S]*)$/)) {
        let eventName = RegExp.$1.replace(/^[\s\S]/, s => s.toLocaleLowerCase())
        element.addEventListener(eventName, value)
      }
      if (name === 'className') {
        name = 'class'
      }
      element.setAttribute(name, value)
    }

    for (let child of this.children) {
      const range = document.createRange()
      if (element.children.length) {
        range.setStartAfter(element.lastChild)
        range.setEndAfter(element.lastChild)
      } else {
        range.setStart(element, 0)
        range.setEnd(element, 0)
      }
      child.mountTo(range)
    }
    range.insertNode(element)
  }
}

class TextWrapper {
  constructor (content) {
    this.root = document.createTextNode(content)
    this.type = '_text'
    this.children = []
    this.props = Object.create(null)
  }
  mountTo (range) {
    this.range = range
    range.deleteContents()
    range.insertNode(this.root)
  }
  get vdom () {
    return this
  }
}

export class Component {
  constructor () {
    this.children = []
    this.props = Object.create(null)
    this.state = {}
    this.type = this.constructor.name
  }
  mountTo (range) {
    this.range = range
    this.update()
  }
  update () {
    // const placeholder = document.createComment('placeholder')
    // const range = document.createRange()
    // range.setStart(this.range.endContainer, this.range.endOffset)
    // range.setEnd(this.range.endContainer, this.range.endOffset)
    // range.insertNode(placeholder)
    // this.range.deleteContents()

    // const vdom = this.render()
    let vdom = this.vdom
    if (this.oldVdom) {
      // console.log('new', vdom)
      // console.log('old', this.vdom)
      let isSameNode = (node1, node2) => {
        if (String(node1) !== String(node2)) {
          return false
        }
        if (node1.type !== node2.type) { // 类型不等
          return false
        }
        for (let name in node1.props) { // 属性不等
          if (node1.props[name] !== node2.props[name]) {
            return false
          }
        }
        if (Object.keys(node2.props).length !== Object.keys(node1.props).length) { // 属性长度不相等
          return false
        }
        return true
      }
      let isSameTree = (node1, node2) => {
        if (!isSameNode(node1, node2)) {
          return false
        }
        if (node2.children.length !== node1.children.length) {
          return false
        }
        for (let i = 0; i < node1.children.length; i++) {
          if (!isSameTree(node1.children[i], node2.children[i])) {
            return false
          }
        }
        return true
      }

      let replace = (newTree, oldTree) => {
        if (isSameTree(newTree, oldTree)) {
          console.log('all same')
          return
        } else if (!isSameNode(newTree, oldTree)) {
          console.log('all different')
          if (oldTree) {
            newTree.mountTo(oldTree.range, true)
          } else {
            vdom.mountTo(this.range)
          }
        } else {
          for (let i = 0; i < newTree.children.length; i++) {
            replace(newTree.children[i], oldTree.children[i])
          }
        }
      }

      replace(vdom, this.oldVdom)
    } else {
      vdom.mountTo(this.range)
    }
    this.oldVdom = vdom
  }
  get vdom () {
    return this.render().vdom
  }
  setAttribute (name, value) {
    this.props[name] = value
    this[name] = value
  }
  appendChild (vchild) {
    this.children.push(vchild)
  }
  setState (state) {
    this.state = Object.assign({}, this.state, state)
    this.update()
  }
}

export let OwlReact = {
  createElement (type, attributes, ...children) {
    let element
    if (typeof type === 'string')
      element = new ElementWrapper(type)
    else
      element = new type
    for (let name in attributes) {
      element.setAttribute(name, attributes[name])
    }
    let insertChildren = (children) => {
      for (let child of children) {
        if (typeof child === 'object' && child instanceof Array) {
          insertChildren(child)
        } else {
          if (child === null || child === void 0) {
            child = ''
          }
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

    return element
  },
  render (vdom, element) {
    const range = document.createRange()
    if (element.children.length) {
      range.setStartAfter(element.lastChild)
      range.setEndAfter(element.lastChild)
    } else {
      range.setStart(element, 0)
      range.setEnd(element, 0)
    }
    vdom.mountTo(range)
  }
}