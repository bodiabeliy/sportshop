import Vue from 'vue'
import App from './App.vue'
import store from './vuex/store'
import router from './router'
import firebase from '../firebase'
import 'firebase/database'
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app'),
created();
  const firebaseConfig = {
    apiKey: "AIzaSyAQFGSpaKGm-jW0f7NSbTomlRC9KC4wsE0",
    authDomain: "sportshop-4597c.firebaseapp.com",
    databaseURL: "https://sportshop-4597c.firebaseio.com",
    projectId: "sportshop-4597c",
    storageBucket: "sportshop-4597c.appspot.com",
    messagingSenderId: "389859199965",
    appId: "1:389859199965:web:3fbf30800a931cfadd8434",
  }
   firebase.initializeApp(firebaseConfig)
