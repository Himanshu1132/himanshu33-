import Vue from 'vue';
import Vuex from 'vuex';

import auth from './module/rest/auth';
import breadcrumbs from './module/template/breadcrumbs';
import config from './module/template/config';
import htmlclass from './module/template/htmlclass';
import industry from './module/rest/industry';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: { auth, breadcrumbs, config, htmlclass, industry }
});
