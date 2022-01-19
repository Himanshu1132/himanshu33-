'use strict';

var LayoutAsideToggle = (function () {
  // Private properties
  var _body;
  var _element;
  var _toggleObject;

  // Initialize
  var _init = function () {
    _toggleObject = new Toggle(_element, {
      target: _body,
      targetState: 'aside-minimize',
      toggleState: 'aside-toggle-active'
    });

    _toggleObject.on('toggle', function (toggle) {
      // Update sticky card
      if (typeof LayoutStickyCard !== 'undefined') {
        setTimeout(function () {
          LayoutStickyCard.update();
        }, 500);
      }

      // Pause header menu dropdowns
      if (typeof LayoutHeaderMenu !== 'undefined') {
        LayoutHeaderMenu.pauseDropdownHover(800);
      }

      // Pause aside menu dropdowns
      if (typeof LayoutAsideMenu !== 'undefined') {
        LayoutAsideMenu.pauseDropdownHover(800);
      }

      // Remember state in cookie
      Cookie.setCookie('aside_toggle_state', toggle.getState());
      // to set default minimized left aside use this cookie value in your
      // server side code and add "kt-primary--minimize aside-minimize" classes to
      // the body tag in order to initialize the minimized left aside mode during page loading.
    });

    _toggleObject.on('beforeToggle', function (toggle) {
      //if (Util.hasClass(_body, 'aside-minimize') === false && Util.hasClass(_body, 'aside-minimize-hover')) {
      //	Util.removeClass(_body, 'aside-minimize-hover');
      //}
    });
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
    },

    getElement: function () {
      return _element;
    },

    getToggle: function () {
      return _toggleObject;
    },

    onToggle: function (handler) {
      if (typeof _toggleObject.element !== 'undefined') {
        _toggleObject.on('toggle', handler);
      }
    }
  };
})();

export default LayoutAsideToggle;
