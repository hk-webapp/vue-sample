import Vue from 'vue';
import VueRouter from 'vue-router';
import VueJquery from 'vue-jquery'
import App from './components/App.vue';
import store from './store';
import routes from './route'
import BootstrapVue from 'bootstrap-vue'
import VeeValidate from 'vee-validate';
import messages from 'vee-validate/dist/locale/fa.js';
import messagesFa from './strings/validator/messages/fa.js';
import auth from './apis/authMng'

Vue.use(BootstrapVue)
Vue.use(VueRouter);
Vue.use(VueJquery);

// Merge the locales.
VeeValidate.Validator.localize("fa", messages);
Vue.use(VeeValidate, {
  inject: true,
  locale: 'fa',
  dictionary: {
    //en: { attributes: attributesEn },
    fa: messagesFa
  },
  // fieldsBagName: '$veeFields',
  errorBagName: 'pageErrors',
  events: 'change|blur',
  classes: true,
  classNames: {
    valid: 'v-is-valid',
    invalid: 'v-is-invalid'
  }
});


Vue.config.productionTip = false;

const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth.loggedIn()) {
      next({
        path: "login",
        query: { redirect: to.fullPath }
      });
    }
    else {
      next();
    }
  }
  else {
    next();
  }
})

// router.afterEach((to, from) => {

// })

//import { currency } from './currency'
//Vue.filter('currency', currency)

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});