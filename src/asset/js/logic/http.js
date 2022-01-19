'use strict';

/**
 * @class Http class that provides world geography helper functions
 */
var Http = function (
  resolve,
  reject,
  success = 200,
  fx = (data) => {
    return data;
  }
) {
  // Main object
  var the = this;

  //////////////////////////
  // * Public Functions * //
  //////////////////////////

  /**
   * Promise.then
   */
  the.result = function ({ status, data }) {
    switch (status) {
      case success:
        fx(data);
        resolve(data.value);
        break;
      default:
        throw { status: status, errors: data.errors };
    }
  };

  /**
   * Promise.then
   */
  the.followup = function ({ status, headers, data }) {
    switch (status) {
      case success:
        resolve(fx({ headers: headers, payload: data.value }));
        break;
      default:
        throw { status: status, errors: data.errors };
    }
  };

  /**
   * Promise.catch
   */
  the.exception = function ({ errors }) {
    reject(errors);
  };

  the.error = function (error) {
    reject(error);
  };

  return the;
};

// webpack support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = Http;
}

export default Http;
