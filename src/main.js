import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './globalComponents.js'
import VueColumnsResizable from 'vue-columns-resizable'
import './lib/axios'
import './filter/msFilter'

Vue.use(VueColumnsResizable)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
