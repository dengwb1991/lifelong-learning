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
  setState (state) {
    this.state = Object.assign({}, this.state, state)
    // let merge = (oldState, newState) => {
    //   for (let p in newState) {
    //     if (typeof newState[p] === 'object') {
    //       if (typeof oldState[p] !== 'object') {
    //         oldState = {}
    //       }
    //       merge(oldState[p], newState[p])
    //     } else {
    //       oldState[p] = newState[p]
    //     }
    //   }
    // }
    // if (!this.state && state) {
    //   this.state = {}
    // }
    // merge(this.state, state)
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
    vdom.mountTo(element)
  }
}