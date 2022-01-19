'use strict';

var LayoutScrolltop = (function () {
  // Private properties
  var _element;
  var _object;

  // Private functions
  var _init = function () {
    _object = new Scrolltop(_element, {
      offset: 300,
      speed: 600
    });
  };

  // Public methods
  return {
    init: function (id) {
      _element = Util.getById(id);

      if (!_element) {
        return;
      }

      // Initialize
      _init();
    },

    getElement: function () {
      return _element;
    }
  };
})();

export default LayoutScrolltop;
