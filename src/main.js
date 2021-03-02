import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import Firebase from "./firebase";
Firebase.init();

import vueMoveDrag from 'vue-move-drag'
Vue.use(vueMoveDrag)

Vue.config.productionTip = false



Vue.use(vueMoveDrag)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
