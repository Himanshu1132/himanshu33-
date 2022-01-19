import Vue from 'vue';
import App from './App.vue';
import { router } from './router';
import store from './core/store';
import Api from '@/core/service/api';
import { VERIFY, ENTITY } from '@/core/store/module/rest/auth';

Vue.config.productionTip = false;

// Vue 3rd party plugins
import PerfectScrollbar from 'perfect-scrollbar';
window.PerfectScrollbar = PerfectScrollbar;

// Vue 3rd party plugins
import '@/core/plugin/apexcharts';
import '@/core/plugin/bootstrap-vue';
import '@/core/plugin/inline-svg';
import '@/core/plugin/metronic';
import '@/core/plugin/perfect-scrollbar';

// API service init
Api.init();

router.beforeEach((to, from, next) => {
  document.title = `Nishe | ${to.meta.title}`;
  // Ensure we checked auth before each page load.
  Promise.all([store.dispatch(`auth/${VERIFY}`), store.dispatch(`auth/${ENTITY}`)]).then(next);

  // Scroll page to top on every route change
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
});

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
