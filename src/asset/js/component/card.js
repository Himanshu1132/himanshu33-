'use strict';

import Util from './util';

// Component Definition
var Card = function (elementId, options) {
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
    toggleSpeed: 400,
    sticky: {
      releseOnReverse: false,
      offset: 300,
      zIndex: 101
    }
  };

  ////////////////////////////
  // ** Private Methods  ** //
  ////////////////////////////

  var Plugin = {
    /**
     * Construct
     */

    construct: function (options) {
      if (Util.data(element).has('card')) {
        the = Util.data(element).get('card');
      } else {
        // reset menu
        Plugin.init(options);

        // build menu
        Plugin.build();

        Util.data(element).set('card', the);
      }

      return the;
    },

    /**
     * Init card
     */
    init: function (options) {
      the.element = element;
      the.events = [];

      // merge default and user defined options
      the.options = Util.deepExtend({}, defaultOptions, options);
      the.header = Util.child(element, '.card-header');
      the.footer = Util.child(element, '.card-footer');

      if (Util.child(element, '.card-body')) {
        the.body = Util.child(element, '.card-body');
      } else if (Util.child(element, '.form')) {
        the.body = Util.child(element, '.form');
      }
    },

    /**
     * Build Form Wizard
     */
    build: function () {
      // Remove
      var remove = Util.find(the.header, '[data-card-tool=remove]');
      if (remove) {
        Util.addEvent(remove, 'click', function (e) {
          e.preventDefault();
          Plugin.remove();
        });
      }

      // Reload
      var reload = Util.find(the.header, '[data-card-tool=reload]');
      if (reload) {
        Util.addEvent(reload, 'click', function (e) {
          e.preventDefault();
          Plugin.reload();
        });
      }

      // Toggle
      var toggle = Util.find(the.header, '[data-card-tool=toggle]');
      if (toggle) {
        Util.addEvent(toggle, 'click', function (e) {
          e.preventDefault();
          Plugin.toggle();
        });
      }
    },

    /**
     * Enable stickt mode
     */
    initSticky: function () {
      var lastScrollTop = 0;
      var offset = the.options.sticky.offset;

      if (!the.header) {
        return;
      }

      window.addEventListener('scroll', Plugin.onScrollSticky);
    },

    /**
     * Window scroll handle event for sticky card
     */
    onScrollSticky: function (e) {
      var offset = the.options.sticky.offset;

      if (isNaN(offset)) return;

      var st = Util.getScrollTop();

      if (st >= offset && Util.hasClass(body, 'card-sticky-on') === false) {
        Plugin.eventTrigger('stickyOn');

        Util.addClass(body, 'card-sticky-on');

        Plugin.updateSticky();
      } else if (st * 1.5 <= offset && Util.hasClass(body, 'card-sticky-on')) {
        // Back scroll mode
        Plugin.eventTrigger('stickyOff');

        Util.removeClass(body, 'card-sticky-on');

        Plugin.resetSticky();
      }
    },

    updateSticky: function () {
      if (!the.header) {
        return;
      }

      var top;

      if (Util.hasClass(body, 'card-sticky-on')) {
        if (the.options.sticky.position.top instanceof Function) {
          top = parseInt(the.options.sticky.position.top.call(this, the));
        } else {
          top = parseInt(the.options.sticky.position.top);
        }

        var left;
        if (the.options.sticky.position.left instanceof Function) {
          left = parseInt(the.options.sticky.position.left.call(this, the));
        } else {
          left = parseInt(the.options.sticky.position.left);
        }

        var right;
        if (the.options.sticky.position.right instanceof Function) {
          right = parseInt(the.options.sticky.position.right.call(this, the));
        } else {
          right = parseInt(the.options.sticky.position.right);
        }

        Util.css(the.header, 'z-index', the.options.sticky.zIndex);
        Util.css(the.header, 'top', top + 'px');
        Util.css(the.header, 'left', left + 'px');
        Util.css(the.header, 'right', right + 'px');
      }
    },

    resetSticky: function () {
      if (!the.header) {
        return;
      }

      if (Util.hasClass(body, 'card-sticky-on') === false) {
        Util.css(the.header, 'z-index', '');
        Util.css(the.header, 'top', '');
        Util.css(the.header, 'left', '');
        Util.css(the.header, 'right', '');
      }
    },

    /**
     * Remove card
     */
    remove: function () {
      if (Plugin.eventTrigger('beforeRemove') === false) {
        return;
      }

      Util.remove(element);

      Plugin.eventTrigger('afterRemove');
    },

    /**
     * Set content
     */
    setContent: function (html) {
      if (html) {
        the.body.innerHTML = html;
      }
    },

    /**
     * Get body
     */
    getBody: function () {
      return the.body;
    },

    /**
     * Get self
     */
    getSelf: function () {
      return element;
    },

    /**
     * Reload
     */
    reload: function () {
      Plugin.eventTrigger('reload');
    },

    /**
     * Toggle
     */
    toggle: function () {
      if (Util.hasClass(element, 'card-collapse') || Util.hasClass(element, 'card-collapsed')) {
        Plugin.expand();
      } else {
        Plugin.collapse();
      }
    },

    /**
     * Collapse
     */
    collapse: function () {
      if (Plugin.eventTrigger('beforeCollapse') === false) {
        return;
      }

      Util.slideUp(the.body, the.options.toggleSpeed, function () {
        Plugin.eventTrigger('afterCollapse');
      });

      Util.addClass(element, 'card-collapse');
    },

    /**
     * Expand
     */
    expand: function () {
      if (Plugin.eventTrigger('beforeExpand') === false) {
        return;
      }

      Util.slideDown(the.body, the.options.toggleSpeed, function () {
        Plugin.eventTrigger('afterExpand');
      });

      Util.removeClass(element, 'card-collapse');
      Util.removeClass(element, 'card-collapsed');
    },

    /**
     * Trigger events
     */
    eventTrigger: function (name) {
      //Util.triggerCustomEvent(name);
      for (var i = 0; i < the.events.length; i++) {
        var event = the.events[i];
        if (event.name == name) {
          if (event.one == true) {
            if (event.fired == false) {
              the.events[i].fired = true;
              return event.handler.call(this, the);
            }
          } else {
            return event.handler.call(this, the);
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

      return the;
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
   * Remove card
   */
  the.remove = function () {
    return Plugin.remove(html);
  };

  /**
   * Init sticky card
   */
  the.initSticky = function () {
    return Plugin.initSticky();
  };

  /**
   * Rerender sticky layout
   */
  the.updateSticky = function () {
    return Plugin.updateSticky();
  };

  /**
   * Reset the sticky
   */
  the.resetSticky = function () {
    return Plugin.resetSticky();
  };

  /**
   * Destroy sticky card
   */
  the.destroySticky = function () {
    Plugin.resetSticky();
    window.removeEventListener('scroll', Plugin.onScrollSticky);
  };

  /**
   * Reload card
   */
  the.reload = function () {
    return Plugin.reload();
  };

  /**
   * Set card content
   */
  the.setContent = function (html) {
    return Plugin.setContent(html);
  };

  /**
   * Toggle card
   */
  the.toggle = function () {
    return Plugin.toggle();
  };

  /**
   * Collapse card
   */
  the.collapse = function () {
    return Plugin.collapse();
  };

  /**
   * Expand card
   */
  the.expand = function () {
    return Plugin.expand();
  };

  /**
   * Get cardbody
   * @returns {jQuery}
   */
  the.getBody = function () {
    return Plugin.getBody();
  };

  /**
   * Get cardbody
   * @returns {jQuery}
   */
  the.getSelf = function () {
    return Plugin.getSelf();
  };

  /**
   * Attach event
   */
  the.on = function (name, handler) {
    return Plugin.addEvent(name, handler);
  };

  /**
   * Attach event that will be fired once
   */
  the.one = function (name, handler) {
    return Plugin.addEvent(name, handler, true);
  };

  // Construct plugin
  Plugin.construct.apply(the, [options]);

  return the;
};

// webpack support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = Card;
}

export default Card;
