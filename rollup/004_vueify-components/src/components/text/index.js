import DText from './src/index.vue'

DText.install = function(Vue) {
  Vue.component(DText.name, DText)
}

export default DText