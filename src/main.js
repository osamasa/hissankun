import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import firebase from 'firebase/app';

Vue.config.productionTip = false

const firebaseConfig = {
    apiKey: "AIzaSyCaBGApDd_Z1YP5cWBQh4O30hXJaIk7BQ0",
    authDomain: "hissankun-84bbc.firebaseapp.com",
    projectId: "hissankun-84bbc",
    storageBucket: "hissankun-84bbc.appspot.com",
    messagingSenderId: "619036059033",
    appId: "1:619036059033:web:f744b7507671d5901b9f08"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
