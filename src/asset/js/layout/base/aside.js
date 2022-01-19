'use strict';

var LayoutAside = (function () {
  // Private properties
  var _body;
  var _element;
  var _offcanvasObject;

  // Private functions
  // Initialize
  var _init = function () {
    var offcanvasClass = Util.hasClass(_element, 'aside-offcanvas-default') ? 'aside-offcanvas-default' : 'aside';

    // Initialize mobile aside offcanvas
    _offcanvasObject = new Offcanvas(_element, {
      baseClass: offcanvasClass,
      overlay: true,
      closeBy: 'aside_close_btn',
      toggleBy: {
        target: 'aside_mobile_toggle',
        state: 'mobile-toggle-active'
      }
    });
  };

  var _initNav = function () {
    var asideNav = Util.find(_element, '.aside-primary .aside-nav');

    if (!asideNav) {
      return;
    }

    Util.scrollInit(asideNav, {
      disableForMobile: true,
      resetHeightOnDestroy: true,
      handleWindowResize: true,
      height: function () {
        var height = parseInt(Util.getViewPort().height);
        var asideBrand = Util.find(_element, '.aside-primary .aside-brand');
        var asideFooter = Util.find(_element, '.aside-primary .aside-footer');

        height = height - parseInt(Util.css(asideBrand, 'height'));
        height = height - (parseInt(Util.css(asideBrand, 'marginBottom')) + parseInt(Util.css(asideBrand, 'marginTop')));

        height = height - parseInt(Util.css(asideFooter, 'height'));
        height = height - (parseInt(Util.css(asideFooter, 'marginBottom')) + parseInt(Util.css(asideFooter, 'marginTop')));

        return height;
      }
    });
  };

  var _initWorkspace = function () {
    var asideTabs = Util.find(_element, '.aside-primary .aside-nav .nav');
    var asideWorkspace = Util.find(_element, '.aside-secondary .aside-workspace');

    if (!asideWorkspace) {
      return;
    }

    Util.scrollInit(asideWorkspace, {
      disableForMobile: true,
      resetHeightOnDestroy: true,
      handleWindowResize: true,
      height: function () {
        var height = parseInt(Util.getViewPort().height);
        var asideSecondary = Util.find(_element, '.aside-secondary');

        height = height - (parseInt(Util.css(asideWorkspace, 'marginBottom')) + parseInt(Util.css(asideWorkspace, 'marginTop')));
        height = height - (parseInt(Util.css(asideSecondary, 'paddingBottom')) + parseInt(Util.css(asideSecondary, 'paddingTop')));

        return height;
      }
    });

    if (asideTabs) {
    }
  };

  // Public methods
  return {
    init: function (id) {
      _element = Util.getById(id);
      _body = Util.getBody();

      if (!_element) {
        return;
      }

      // Initialize
      _init();
      _initNav();
      _initWorkspace();
    },

    getElement: function () {
      return _element;
    },

    getOffcanvas: function () {
      return _offcanvasObject;
    }
  };
})();

export default LayoutAside;
