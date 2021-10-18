// import { hello } from './hello.js'
// 测试 commonJs 引入打包
// import common from './commonjs.js'

// hello('rollup')
// console.log('commonJs::', common.a)

// export const world = 'world'

// 测试样式引入打包
// import "./test.less"

/** vue */ 
// import Index from './index.vue'

// function install (Vue) {
//   Vue.component(Index.name, Index)
// }

// export default install


/** vue components */
import { transformCamelCase } from './common/util.js'
import Button from './components/button/index.vue'
import Text from './components/text/index.vue'

export const components = {
  Button,
  Text
}

const install = function (Vue) {
  if (!Vue || install.installed) {
    return
  }

  const componentsNames = Object.keys(components)
  componentsNames.forEach(name => {
    const component = components[name]
    if (component.name) {
      Vue.component(component.name, component) // kebab-case
      Vue.component(transformCamelCase(`-${component.name}`), component) // PascalCase
    }
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  install,
  Button,
  Text
}

export default {
  install
}