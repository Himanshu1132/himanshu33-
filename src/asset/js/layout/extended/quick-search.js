'use strict';

var LayoutQuickSearch = (function () {
  // Private properties
  var _element;
  var _offcanvasObject;

  // Private functions
  var _init = function () {
    var header = Util.find(_element, '.offcanvas-header');
    var content = Util.find(_element, '.offcanvas-content');
    var form = Util.find(_element, '.quick-search-form');
    var results = Util.find(_element, '.quick-search-wrapper');

    _offcanvasObject = new Offcanvas(_element, {
      overlay: true,
      baseClass: 'offcanvas',
      placement: 'right',
      closeBy: 'quick_search_close',
      toggleBy: 'quick_search_toggle'
    });

    Util.scrollInit(results, {
      disableForMobile: true,
      resetHeightOnDestroy: true,
      handleWindowResize: true,
      height: function () {
        var height = parseInt(Util.getViewPort().height);

        if (header) {
          height = height - parseInt(Util.actualHeight(header));
          height = height - parseInt(Util.css(header, 'marginTop'));
          height = height - parseInt(Util.css(header, 'marginBottom'));
        }

        if (content) {
          height = height - parseInt(Util.css(content, 'marginTop'));
          height = height - parseInt(Util.css(content, 'marginBottom'));
        }

        if (results) {
          height = height - parseInt(Util.actualHeight(form));
          height = height - parseInt(Util.css(form, 'marginTop'));
          height = height - parseInt(Util.css(form, 'marginBottom'));

          height = height - parseInt(Util.css(results, 'marginTop'));
          height = height - parseInt(Util.css(results, 'marginBottom'));
        }

        height = height - parseInt(Util.css(_element, 'paddingTop'));
        height = height - parseInt(Util.css(_element, 'paddingBottom'));

        height = height - 2;

        return height;
      }
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

export default LayoutQuickSearch;
