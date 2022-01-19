import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Token from '@/core/service/storage';

/*
 ˰* Service to call HTTP request via Axios
  */
const Api = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = process.env.VUE_APP_API;
    Vue.axios.defaults.timeout = 35000;
    Vue.axios.defaults.headers.common['Accept'] = 'application/json';
    Vue.axios.defaults.withCredentials = true;

    Vue.axios.interceptors.response.use(
      (res) => res,
      (ex) => {
        switch (typeof ex) {
          case 'string':
            throw { status: -1, errors: [ex] };
          case 'object':
            if (ex.response !== undefined) {
              throw { status: ex.response.status, errors: ex.response.data.errors };
            }
            throw { status: -1, errors: [ex.message] };
        }
      }
    );
  },
  /*
˰˰˰* Set Base URL
   */
  setBase(url) {
    Vue.axios.defaults.baseURL = url;
  },

  /*
˰˰˰* Set the default HTTP request headers
   */
  setBearer() {
    Vue.axios.defaults.headers.common['Authorization'] = `Bearer ${Token.getItem('JWT')}`;
  },

  /*
˰˰˰* Set the default HTTP request headers
   */
  setHeader(key, value) {
    Vue.axios.defaults.headers.common[key] = value;
  },
  rmHeaders(headers = []) {
    for (let item of headers) {
      delete axios.defaults.headers.common[item];
    }
  },

  /**
   * Send the GET HTTP request
   * @param resource
   * @param config
   * @returns {*}
   */
  get(url, config = {}) {
    return Vue.axios.get(url, config).catch((error) => {
      throw error;
    });
  },

  /**
   * Set the POST HTTP request
   * @param resource
   * @param params
   * @param config
   * @returns {*}
   */
  post(resource, params, config = {}) {
    return Vue.axios.post(`${resource}`, params, config);
  },

  /**
   * Send the PUT HTTP request
   * @param resource
   * @param params
   * @param config
   * @returns {IDBRequest<IDBValidKey> | Promise<void>}
   */
  put(resource, params, config = {}) {
    return Vue.axios.put(`${resource}`, params, config);
  },

  /**
   * Send the DELETE HTTP request
   * @param resource
   * @returns {*}
   */
  delete(resource, config = {}) {
    return Vue.axios.delete(resource, config).catch((error) => {
      throw error;
    });
  }
};
export default Api;
