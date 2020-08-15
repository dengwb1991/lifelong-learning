class ElementWrapper {
  constructor (type) {
    this.root = document.createElement(type)
  }
  setAttribute (name, value) {
    this.root.setAttribute(name, value)
  }
  appendChild (vchild) {
    // console.log('ElementWrapper appendChild', vchild)
    vchild.mountTo(this.root)
  }
  mountTo (parent) {
    // console.log('ElementWrapper mountTo', parent, this.root)
    parent.appendChild(this.root)
  }
}

class TextWrapper {
  constructor (content) {
    this.root = document.createTextNode(content)
  }
  mountTo (parent) {
    // console.log('TextWrapper mountTo', parent)
    parent.appendChild(this.root)
  }
}

export class Component {
  mountTo (parent) {
    let vdom = this.render()
    // console.log('Component mountTo', vdom, parent)
    vdom.mountTo(parent)
  }
  setAttribute (name, value) {
    this[name] = value
  }
}

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
    // console.log('render', vdom, element)
    vdom.mountTo(element)
  }
}