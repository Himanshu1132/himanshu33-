'use strict';

/**
 * @class Geo class that privides world geography helper functions
 */
var Passwd = function (LENGTH = 8) {
  // Main object
  var the = this;

  ////////////////////////////
  // * Private Functions  * //
  ////////////////////////////

  var Plugin = {
    upperCase: function (txt) {
      for (let i = 0, len = txt.length; i < len; i++) {
        if (txt.charCodeAt(i) >= 65 && txt.charCodeAt(i) <= 90) return true;
      }
      return false;
    },
    lowerCase: function (txt) {
      for (let i = 0, len = txt.length; i < len; i++) {
        if (txt.charCodeAt(i) >= 97 && txt.charCodeAt(i) <= 122) return true;
      }
      return false;
    },
    numeric: function (txt) {
      for (let i = 0, len = txt.length; i < len; i++) {
        if (txt.charCodeAt(i) >= 48 && txt.charCodeAt(i) <= 57) return true;
      }
      return false;
    },
    symbol: function (txt) {
      for (let i = 0, len = txt.length; i < len; i++) {
        if (
          txt.charCodeAt(i) < 48 ||
          (txt.charCodeAt(i) > 57 && txt.charCodeAt(i) < 65) ||
          (txt.charCodeAt(i) > 90 && txt.charCodeAt(i) < 97) ||
          txt.charCodeAt(i) > 122
        )
          return true;
      }
      return false;
    },
    minLength: function (txt) {
      if (txt.length >= LENGTH) return true;
      return false;
    }
  };

  //////////////////////////
  // * Public Functions * //
  //////////////////////////

  /**
   * Reset Formatting
   */
  the.reset = function (refs, id = 'pStrength') {
    for (let i = 1; i < 3; i++) {
      for (let k = 0; k < 5; k++) {
        refs[`${i}${id}${k}`].classList = '';
      }
    }
  };

  /**
   * Check Password Strength against Requirements
   */
  the.strength = function (refs, tf, value, id = 'pStrength') {
    const ITEMS = 5;

    for (let i = 0; i < ITEMS; i++) refs[`${tf}${id}${i}`].classList = '';
    if (value.length < 1) return false;

    let count = 0;

    if (Plugin.upperCase(value)) {
      refs[`${tf}${id}0`].classList.add('bold');
      count++;
    }
    if (Plugin.lowerCase(value)) {
      refs[`${tf}${id}1`].classList.add('bold');
      count++;
    }
    if (Plugin.numeric(value)) {
      refs[`${tf}${id}2`].classList.add('bold');
      count++;
    }
    if (Plugin.symbol(value)) {
      refs[`${tf}${id}3`].classList.add('bold');
      count++;
    }
    if (Plugin.minLength(value)) {
      refs[`${tf}${id}4`].classList.add('bold');
      count++;
    }

    return count === ITEMS;
  };

  return the;
};

// webpack support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = Passwd;
}

export default Passwd;
