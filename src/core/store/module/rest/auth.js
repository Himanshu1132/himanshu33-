'use strict';

import Http from '@/asset/js/logic/http';
import Api from '@/core/service/api';
import { saveItem, getItem, destroyItem } from '@/core/service/storage';
import { router, isNavigationFailure, NavigationFailureType } from '@/router';

// action types
export const SIGNUP = 'register';
export const SIGNIN = 'auth';
export const VERIFY = 'verify';
export const ENTITY = 'entity';
export const RM_USER = 'rmUser';
export const SIGNOUT = 'deletetoken';

// mutation types
export const PURGE_AUTH = 'logOut';
export const SET_AUTH = 'setUser';
export const SET_AVATAR = 'setAvatar';
export const SET_ENTITY = 'setEntity';
export const SET_FEEDS = 'setNotifications';
export const SET_TENANT = 'setCurrentTenant';
export const SET_SESSION = 'setDetails';

const state = {
  user: { firstname: '', fullname: 'Guest User', email: '', profile: '', avatar: null, tenants: [] },
  tenant: { id: null, name: null, regno: null, website: null, motto: null, logo: null },
  entity: false,
  feeds: { alert: [], event: [], log: [], unread: 0 },
  jwt: getItem('JWT'),
  authenticated: !!getItem('JWT')
};

const getters = {
  currentUser: function (state) {
    return state.user;
  },
  currentTenant: function (state) {
    return state.tenant;
  },
  currentEntity: function (state) {
    return state.entity;
  },
  authenticated: function (state) {
    return state.authenticated;
  },
  getAvatar: function (state) {
    let pic = state.user.avatar || false;
    return pic === false ? 'asset/img/user/blank.png' : `${process.env.VUE_APP_FILES}/img/avatar/${state.user.id}.${state.user.avatar}`;
  },
  notifications: function (state) {
    return state.feeds;
  }
};

const mutations = {
  [SET_AUTH](state, jwt) {
    state.jwt = jwt;
    saveItem('JWT', state.jwt);
    state.authenticated = !!getItem('JWT');
  },
  [SET_ENTITY](state, value) {
    state.entity = value;
  },
  [SET_TENANT](state, value) {
    state.tenant = value;
  },
  [PURGE_AUTH](state) {
    destroyItem('JWT');
    state.user = { firstname: '', fullname: 'Guest User', email: '', profile: '', avatar: null, tenants: '[]' };
    state.tenant = { id: null, name: null, reg: null, web: null, motto: null, logo: null };
    state.jwt = null;
    state.authenticated = !!getItem('JWT');
  },
  [SET_SESSION](state, { user, tenant }) {
    state.user = user;
    state.tenant = tenant;
    if (state.tenant === false && user.tenants.length === 1) {
      saveItem('tenant', user.tenants[0]);
    }
  },
  [SET_FEEDS](state, { feeds }) {
    let notifications = { alert: [], event: [], log: [], unread: 0 };
    notifications.unread = feeds.unread;
    for (let i of feeds.records) {
      notifications[i.type].push(i);
    }
    state.feeds = notifications;
  },
  [SET_AVATAR](state, value) {
    state.user.avatar = value;
  }
};

const actions = {
  [ENTITY]({ commit }) {
    return new Promise((resolve, reject) => {
      if (!getItem('JWT')) {
        resolve(false);
        return;
      }
      const fx = function ({ payload }) {
        commit(SET_ENTITY, payload === false ? payload : { ...payload, entity_id: parseInt(payload.entity_id) });
        resolve(payload);
      };
      const helper = new Http(fx, reject);
      Api.setBearer();
      Api.setHeader('Tenant', getItem('tenant'));
      Api.get(`${process.env.VUE_APP_PARENT}/session/${ENTITY}`).then(helper.followup).catch(helper.error);
    });
  },
  [RM_USER]({ state }) {
    return new Promise((resolve, reject) => {
      const helper = new Http(resolve, reject);
      Api.delete(`${process.env.VUE_APP_PARENT}/user/${state.user.email}`).then(helper.result).catch(helper.exception);
    });
  },
  [SIGNIN]({ commit }, form) {
    return new Promise((resolve, reject) => {
      const helper = new Http(resolve, reject, 200, (data) => {
        commit(SET_AUTH, data.value);
      });
      Api.post(`${process.env.VUE_APP_PARENT}/session/${SIGNIN}`, form).then(helper.result).catch(helper.exception);
    });
  },
  [SIGNOUT]({ commit }) {
    return new Promise((resolve, reject) => {
      const helper = new Http(resolve, reject, 200, (data) => {
        commit(PURGE_AUTH);
      });
      Api.setBearer();
      Api.delete(`${process.env.VUE_APP_PARENT}/session/${SIGNOUT}`).then(helper.result).catch(helper.exception);
    });
  },
  [SIGNUP]({}, form) {
    return new Promise((resolve, reject) => {
      const helper = new Http(resolve, reject, 201);
      Api.post(`${process.env.VUE_APP_PARENT}/session/${SIGNUP}`, { ...form, module: 'N1' })
        .then(helper.result)
        .catch(helper.exception);
    });
  },
  [VERIFY]({ commit }) {
    if (getItem('JWT')) {
      const promise = new Promise((resolve, reject) => {
        const helper = new Http(resolve, reject);
        Api.setBearer();
        Api.setHeader('Tenant', getItem('tenant'));
        Api.get(`${process.env.VUE_APP_PARENT}/session/${VERIFY}`).then(helper.result).catch(helper.exception);
      });
      promise
        .then((res) => {
          commit(SET_SESSION, res);
          commit(SET_FEEDS, res);
        })
        .catch((ex) => {
          commit(PURGE_AUTH);
          router.push({ name: 'signin', params: { errors: ex } }).catch((err) => {
            if (isNavigationFailure(err, NavigationFailureType.duplicated)) {
              window.alert(ex);
              window.alert(`${err.from.path} to ${err.to.path}`);
            }
          });
        });
    } else {
      commit(PURGE_AUTH);
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
