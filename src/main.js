import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2';

import { MdCard, MdButton, MdContent, MdTabs, MdField } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import 'sweetalert2/dist/sweetalert2.min.css'

Vue.use(MdButton)
Vue.use(MdContent)
Vue.use(MdTabs)
Vue.use(MdField)
Vue.use(MdCard)
Vue.use(VueSweetalert2)

import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
