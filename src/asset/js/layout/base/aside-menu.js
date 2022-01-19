'use strict';

var LayoutAsideMenu = (function () {
  // Private properties
  var _element;
  var _menuObject;

  // Initialize
  var _init = function () {
    _menuObject = new Menu(_element, {
      // Submenu setup
      submenu: {
        desktop: 'accordion',
        tablet: 'accordion', // menu set to accordion in tablet mode
        mobile: 'accordion' // menu set to accordion in mobile mode
      },

      // Accordion setup
      accordion: {
        expandAll: false // allow having multiple expanded accordions in the menu
      }
    });

    // Close aside offcanvas panel before page reload On tablet and mobile
    _menuObject.on('linkClick', function (menu) {
      if (Util.isBreakpointDown('lg')) {
        // Tablet and mobile mode
        LayoutAside.getOffcanvas().hide(); // Hide offcanvas after general link click
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

      // Initialize menu
      _init();
    },

    getElement: function () {
      return _element;
    },

    getMenu: function () {
      return _menuObject;
    },

    pauseDropdownHover: function (time) {
      if (_menuObject) {
        _menuObject.pauseDropdownHover(time);
      }
    },

    closeMobileOffcanvas: function () {
      if (_menuObject && Util.isMobileDevice()) {
        _menuObject.hide();
      }
    }
  };
})();

export default LayoutAsideMenu;
