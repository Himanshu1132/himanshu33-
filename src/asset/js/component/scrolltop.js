'use strict';

import Util from './util';

// Component Definition
var Scrolltop = function (elementId, options) {
  // Main object
  var the = this;
  var init = false;

  // Get element object
  var element = Util.getById(elementId);
  var body = Util.getBody();

  if (!element) {
    return;
  }

  // Default options
  var defaultOptions = {
    offset: 300,
    speed: 6000
  };

  ////////////////////////////
  // ** Private Methods  ** //
  ////////////////////////////

  var Plugin = {
    /**
     * Run plugin
     * @returns {mscrolltop}
     */
    construct: function (options) {
      if (Util.data(element).has('scrolltop')) {
        the = Util.data(element).get('scrolltop');
      } else {
        // reset scrolltop
        Plugin.init(options);

        // build scrolltop
        Plugin.build();

        Util.data(element).set('scrolltop', the);
      }

      return the;
    },

    /**
     * Handles subscrolltop click toggle
     * @returns {mscrolltop}
     */
    init: function (options) {
      the.events = [];

      // merge default and user defined options
      the.options = Util.deepExtend({}, defaultOptions, options);
    },

    build: function () {
      var timer;

      window.addEventListener('scroll', function () {
        Util.throttle(
          timer,
          function () {
            Plugin.handle();
          },
          200
        );
      });

      // handle button click
      Util.addEvent(element, 'click', Plugin.scroll);
    },

    /**
     * Handles scrolltop click scrollTop
     */
    handle: function () {
      var pos = Util.getScrollTop(); // current vertical position

      if (pos > the.options.offset) {
        if (body.hasAttribute('data-scrolltop') === false) {
          body.setAttribute('data-scrolltop', 'on');
        }
      } else {
        if (body.hasAttribute('data-scrolltop') === true) {
          body.removeAttribute('data-scrolltop');
        }
      }
    },

    /**
     * Handles scrolltop click scrollTop
     */
    scroll: function (e) {
      e.preventDefault();

      Util.scrollTop(0, the.options.speed);
    },

    /**
     * Trigger events
     */
    eventTrigger: function (name, args) {
      for (var i = 0; i < the.events.length; i++) {
        var event = the.events[i];
        if (event.name == name) {
          if (event.one == true) {
            if (event.fired == false) {
              the.events[i].fired = true;
              return event.handler.call(this, the, args);
            }
          } else {
            return event.handler.call(this, the, args);
          }
        }
      }
    },

    addEvent: function (name, handler, one) {
      the.events.push({
        name: name,
        handler: handler,
        one: one,
        fired: false
      });
    }
  };

  //////////////////////////
  // ** Public Methods ** //
  //////////////////////////

  /**
   * Set default options
   */

  the.setDefaults = function (options) {
    defaultOptions = options;
  };

  /**
   * Get subscrolltop mode
   */
  the.on = function (name, handler) {
    return Plugin.addEvent(name, handler);
  };

  /**
   * Set scrolltop content
   * @returns {mscrolltop}
   */
  the.one = function (name, handler) {
    return Plugin.addEvent(name, handler, true);
  };

  ///////////////////////////////
  // ** Plugin Construction ** //
  ///////////////////////////////

  // Run plugin
  Plugin.construct.apply(the, [options]);

  // Init done
  init = true;

  // Return plugin instance
  return the;
};

// webpack support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = Scrolltop;
}

export default Scrolltop;
