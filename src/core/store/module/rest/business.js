'use strict';

import Http from '@/asset/js/logic/http';
import Api from '@/core/service/api';

const state = { logos: [] };

const getters = {
  getMainLogo: function (state) {}
};

export default {
  namespaced: true,
  state,
  getters
};
