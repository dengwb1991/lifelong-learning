import Vue from 'vue'
import App from './App.vue'
// import rComponents from 'r-components'
// Vue.use(rComponents)
import { Button } from 'd-components'
// import 'd-components/lib/theme/button.css'
Vue.use(Button)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
