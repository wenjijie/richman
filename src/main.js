// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueSocketIO from 'vue-socket.io'
// import socketio from 'socket.io-client';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(new VueSocketIO({
  debug: true,
  // connection: 'http://localhost:7008',
  connection: 'http://richman.qiuluo.xin',
  // connection: 'http://richman.qiuluo.xin/api',
  // connection: 'http://richman.qiuluo.xin:7008',
  vuex: {
    // store,
    // actionPrefix: 'SOCKET_',
    // mutationPrefix: 'SOCKET_'
  },
  // options: { path: "/my-app/" } //Optional options
}))

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  components: { App },
  template: '<App/>'
})
