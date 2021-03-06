import DwbButton from './components/button/index'
import DwbConsole from './components/button/index'

const components = [
  DwbButton,
  DwbConsole,
]

const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue)
}

export default { install }