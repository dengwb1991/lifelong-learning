import DButton from './src/index.vue'

DButton.install = function(Vue) {
  Vue.component(DButton.name, DButton)
}

export default DButton