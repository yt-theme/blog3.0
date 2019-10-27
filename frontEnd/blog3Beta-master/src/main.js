// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import config from './config'
// Api_baseUrl
import VueSocketio from 'vue-socket.io'
// import socketio from 'socket.io-client'

Vue.config.productionTip = false

// socket
Vue.use(
  new VueSocketio({
    debug: true,
    connection: config.Api_baseUrl + ':' + config.Api_port,
    vuex: {
      store,
      mutationPrefix: "SOCKET_",
      actionPrefix: "SOCKET_"
    }
  })
)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
