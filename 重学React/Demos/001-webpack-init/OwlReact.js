export let OwlReact = {
  createElement (type, attributes, ...children) {
    // 根据 type 类型创建 dom 元素
    let element = document.createElement(type)
    // 获取所有的属性进行遍历 重新绑定到 dom 元素上
    for (let name in attributes) {
      element.setAttribute(name, attributes[name])
    }
    /**
     * 添加子元素 children 为数组
     * child 可能为 dom 或者是文本 这里可以使用 typeof
     */ 
    for (let child of children) {
      if (typeof child === 'string') {
        child = document.createTextNode(child)
      }
      element.appendChild(child)
    }
    return element
  }
}