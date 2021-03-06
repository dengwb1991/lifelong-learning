import DwbConsole from "./dwb-console.vue"

DwbConsole.install = function(Vue) {
  Vue.component(DwbConsole.name, DwbConsole)
}

export default DwbConsole
