import Vue from 'vue'
import store from './store/index'
import App from './App'

import { Khala } from '/src/utils/index'

Vue.prototype.$khala = new Khala

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
