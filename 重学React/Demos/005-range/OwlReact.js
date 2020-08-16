class ElementWrapper {
  constructor (type) {
    this.root = document.createElement(type)
  }
  setAttribute (name, value) {
    if (name.match(/^on([\s\S]*)$/)) {
      let eventName = RegExp.$1.replace(/^[\s\S]/, s => s.toLocaleLowerCase())
      this.root.addEventListener(eventName, value)
    }
    if (name === 'className') {
      name = 'class'
    }
    this.root.setAttribute(name, value)
  }
  appendChild (vchild) {
    const range = document.createRange()
    const element = this.root
    if (element.children.length) {
      range.setStartAfter(element.lastChild)
      range.setEndAfter(element.lastChild)
    } else {
      range.setStart(element, 0)
      range.setEnd(element, 0)
    }
    console.log(range)
    vchild.mountTo(range)
    // vchild.mountTo(this.root)
  }
  mountTo (range) {
    range.deleteContents()
    range.insertNode(this.root)
    // parent.appendChild(this.root)
  }
}

class TextWrapper {
  constructor (content) {
    this.root = document.createTextNode(content)
  }
  mountTo (range) {
    range.deleteContents()
    range.insertNode(this.root)
    // parent.appendChild(this.root)
  }
}

export class Component {
  constructor () {
    this.children = []
    this.props = Object.create(null)
  }
  mountTo (range) {
    this.range = range
    this.update()
    // let vdom = this.render()
    // vdom.mountTo(parent)
  }
  update () {
    const placeholder = document.createComment('placeholder')
    const range = document.createRange()
    range.setStart(this.range.endContainer, this.range.endOffset)
    range.setEnd(this.range.endContainer, this.range.endOffset)
    range.insertNode(placeholder)

    this.range.deleteContents()

    const vdom = this.render()
    vdom.mountTo(this.range)
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
    // vdom.mountTo(element)
  }
}