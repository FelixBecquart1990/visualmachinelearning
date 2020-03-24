import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAr4-nWYm51RV6zgGF8xHtHJu1u5yS5BsE",
  authDomain: "visualmachinelearning.firebaseapp.com",
  databaseURL: "https://visualmachinelearning.firebaseio.com",
  projectId: "visualmachinelearning",
  storageBucket: "visualmachinelearning.appspot.com",
  messagingSenderId: "95971368425",
  appId: "1:95971368425:web:bad0420e4fc65f094bbf78",
  measurementId: "G-T9WSBGDKNJ"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

Vue.config.productionTip = false;

// alias
Vue.prototype.$analytics = firebase.analytics();

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
