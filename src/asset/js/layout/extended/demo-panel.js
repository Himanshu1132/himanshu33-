'use strict';

var LayoutDemoPanel = (function () {
  // Private properties
  var _element;
  var _offcanvasObject;

  // Private functions
  var _init = function () {
    _offcanvasObject = new Offcanvas(_element, {
      overlay: true,
      baseClass: 'offcanvas',
      placement: 'right',
      closeBy: 'demo_panel_close',
      toggleBy: 'demo_panel_toggle'
    });

    var header = Util.find(_element, '.offcanvas-header');
    var content = Util.find(_element, '.offcanvas-content');
    var wrapper = Util.find(_element, '.offcanvas-wrapper');
    var footer = Util.find(_element, '.offcanvas-footer');

    Util.scrollInit(wrapper, {
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

        if (wrapper) {
          height = height - parseInt(Util.css(wrapper, 'marginTop'));
          height = height - parseInt(Util.css(wrapper, 'marginBottom'));
        }

        if (footer) {
          height = height - parseInt(Util.actualHeight(footer));
          height = height - parseInt(Util.css(footer, 'marginTop'));
          height = height - parseInt(Util.css(footer, 'marginBottom'));
        }

        height = height - parseInt(Util.css(_element, 'paddingTop'));
        height = height - parseInt(Util.css(_element, 'paddingBottom'));

        height = height - 2;

        return height;
      }
    });

    if (typeof offcanvas !== 'undefined' && offcanvas.length === 0) {
      offcanvas.on('hide', function () {
        var expires = new Date(new Date().getTime() + 60 * 60 * 1000); // expire in 60 minutes from now
        Cookie.setCookie('demo_panel_shown', 1, { expires: expires });
      });
    }
  };

  var _remind = function () {
    if (!(encodeURI(window.location.hostname) == 'keenthemes.com' || encodeURI(window.location.hostname) == 'www.keenthemes.com')) {
      return;
    }

    setTimeout(function () {
      if (!Cookie.getCookie('demo_panel_shown')) {
        var expires = new Date(new Date().getTime() + 15 * 60 * 1000); // expire in 15 minutes from now
        Cookie.setCookie('demo_panel_shown', 1, { expires: expires });
        if (typeof _offcanvasObject !== 'undefined') {
          _offcanvasObject.show();
        }
      }
    }, 4000);
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

      // Remind
      _remind();
    }
  };
})();

export default LayoutDemoPanel;
