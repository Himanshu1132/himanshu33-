'use strict';

/**
 * @class Geo class that provides world geography helper functions
 */
var Geo = function (cmp) {
  // Main object
  var the = this;

  ////////////////////////////
  // * Private Functions  * //
  ////////////////////////////

  var Plugin = {
    getContextText: function (arr, target) {
      for (let i = 0, len = arr.length; i < len; i++) {
        if (arr[i].id.split('.')[0] === target.toLowerCase()) {
          return arr[i].text;
        }
      }
      return null;
    },
    getContextCode: function (arr, target) {
      for (let i = 0, len = arr.length; i < len; i++) {
        if (arr[i].id.split('.')[0] === target.toLowerCase()) {
          return arr[i].short_code.toUpperCase();
        }
      }
      return null;
    },
    getStreetAddress: function (obj) {
      let line = obj.address || '';
      line = `${line} ${obj.text}`;
      return line.trim();
    },
    getSuburb: function ({ context }) {
      return this.getContextText(context, 'neighborhood');
    },
    getCity: function ({ context }) {
      return this.getContextText(context, 'place');
    },
    getCountry: function ({ context }) {
      return this.getContextCode(context, 'region');
    },
    getCountry: function ({ context }) {
      return this.getContextCode(context, 'country');
    },
    getCoordinates: function ({ geometry }) {
      return JSON.stringify(geometry.coordinates);
    }
  };

  //////////////////////////
  // * Public Functions * //
  //////////////////////////

  /**
   * Styling
   */
  the.decorate = function (inputCSS, id = null) {
    let magnifier = document.querySelector('.mapboxgl-ctrl-geocoder--icon.mapboxgl-ctrl-geocoder--icon-search');
    magnifier.parentNode.removeChild(magnifier);

    let input = document.querySelector('.mapboxgl-ctrl-geocoder--input');
    input.autocomplete = 'off';
    input.classList = inputCSS;
    if (id) input.id = id;

    let wrap = document.querySelector('.mapboxgl-ctrl-geocoder.mapboxgl-ctrl');
    wrap.style.width = '100%';
    wrap.style.boxShadow = 'none';
    wrap.style.maxWidth = 'none';

    let xBtn = document.querySelector('.mapboxgl-ctrl-geocoder--button');
    xBtn.style.backgroundColor = 'transparent';
  };

  /**
   * Forward Geocoding
   */
  the.set = function ({ result }) {
    cmp.form.addressline1 = Plugin.getStreetAddress(result);
    cmp.form.addressline2 = Plugin.getSuburb(result);
    cmp.form.city = Plugin.getCity(result);
    cmp.form.country = Plugin.getCountry(result);
    cmp.form.gps = Plugin.getCoordinates(result);
  };
  the.mutate = function ({ result }) {
    cmp['setAddressLine1'](Plugin.getStreetAddress(result));
    cmp['setAddressLine2'](Plugin.getSuburb(result));
    cmp['setCity'](Plugin.getCity(result));
    cmp['setCountry'](Plugin.getCountry(result));
    cmp['setGPS'](Plugin.getCoordinates(result));
    the.set({ result });
  };

  return the;
};

// webpack support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = Geo;
}

export default Geo;
