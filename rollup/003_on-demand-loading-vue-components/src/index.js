/** vue components */
import Button from './components/button/index'
import Text from './components/text/index'

export const components = {
  Button,
  Text
}

const install = function (Vue) {
  if (!Vue || install.installed) {
    return
  }

  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}


export default {
  install,
  ...components
}