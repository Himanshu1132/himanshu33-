'use strict';

import Http from '@/asset/js/logic/http';
import { bool } from '@/asset/js/logic/hack';
import Api from '@/core/service/api';
import { getItem } from '@/core/service/storage';

// action types
export const ASSOCIATE = 'associate';
export const BANNER = 'banner';
export const DATA = 'data';
export const DISCONNECT = 'disconnect';
export const LS = 'ls';

// mutation types
export const SET_CATEGORY = 'setCategoryId';
export const SET_INDUSTRY = 'setIndusrty';
export const SET_DESCRIPTION = 'setDescription';
export const SET_MAIN = 'setMain';
export const SET_DEALINGS = 'setDealings';
export const SET_DATA = 'setData';

const state = {
  data: {},
  dealings: []
};

const getters = {
  getDealings: function (state) {
    return state.dealings;
  }
};

const mutations = {
  [SET_CATEGORY](state, value) {
    state.data.category_id = value;
  },
  [SET_INDUSTRY](state, value) {
    state.data.count = value;
  },
  [SET_DESCRIPTION](state, value) {
    state.data.description = value;
  },
  [SET_MAIN](state, value) {
    state.data.main = value;
  },
  [SET_DATA](state, value) {
    state.data = value;
  },
  [SET_DEALINGS](state, value) {
    let ls = [];
    for (const i in value) {
      let item = value[i];
      item['entity_id'] = parseInt(value[i]['entity_id']);
      item['main'] = bool(value[i]['main']);
      ls.push(item);
    }
    state.dealings = ls;
  }
};

const actions = {
  [ASSOCIATE]({ state }, banner) {
    return new Promise((resolve, reject) => {
      const helper = new Http(resolve, reject);
      Api.setBearer();
      Api.setHeader('Tenant', getItem('tenant'));
      Api.post(`/industry/${ASSOCIATE}`, { ...state.data, ...banner })
        .then(helper.result)
        .catch(helper.exception);
    });
  },
  [BANNER]({ state }) {
    return new Promise((resolve, reject) => {
      const helper = new Http(resolve, reject);
      Api.setBearer();
      Api.setHeader('Tenant', getItem('tenant'));
      Api.delete(`/industry/${BANNER}/${state.data.category_id}/${state.data.count}`).then(helper.result).catch(helper.exception);
    });
  },
  [DATA]({}, { categoryId, count }) {
    return new Promise((resolve, reject) => {
      const helper = new Http(resolve, reject);
      Api.setBearer();
      Api.setHeader('Tenant', getItem('tenant'));
      Api.get(`/industry/${DATA}/${categoryId}/${count}`).then(helper.result).catch(helper.exception);
    });
  },
  [DISCONNECT]({}, { categoryId, count }) {
    return new Promise((resolve, reject) => {
      const helper = new Http(resolve, reject);
      Api.setBearer();
      Api.setHeader('Tenant', getItem('tenant'));
      Api.delete(`/industry/${DISCONNECT}/${categoryId}/${count}`).then(helper.result).catch(helper.exception);
    });
  },
  [LS]({}, { target, entityId }) {
    return new Promise((resolve, reject) => {
      const helper = new Http(resolve, reject);
      Api.rmHeaders(['Authorization', 'Tenant']);
      Api.get(`/industry/${LS}/${target}/${entityId}`).then(helper.result).catch(helper.exception);
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
