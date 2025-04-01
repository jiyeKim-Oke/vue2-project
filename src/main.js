import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

window.__STORE__ = store

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
