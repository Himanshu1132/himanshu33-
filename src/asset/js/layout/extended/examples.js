"use strict";

var LayoutExamples = function() {

    var initDefaultMode = function(element) {
        var elements = element;
        if (typeof elements === 'undefined') {
            elements = document.querySelectorAll('.example:not(.example-compact):not(.example-hover):not(.example-basic)');
        }

        for (var i = 0; i < elements.length; ++i) {
            var example = elements[i];
            var copy = Util.find(example, '.example-copy');

            var clipboard = new ClipboardJS(copy, {
                target: function(trigger) {
                    var example = trigger.closest('.example');
                    var el = Util.find(example, '.example-code .tab-pane.active');

                    if (!el) {
                        el = Util.find(example, '.example-code');
                    }

                    return el;
                }
            });

            clipboard.on('success', function(e) {
                Util.addClass(e.trigger, 'example-copied');
                e.clearSelection();

                setTimeout(function() {
                    Util.removeClass(e.trigger, 'example-copied');
                }, 2000);
            });
        }
    }

    var initCompactMode = function(element) {
        var example,code,toggle,copy, clipboard;
        var elements = element;
        if (typeof elements === 'undefined') {
            var elements = document.querySelectorAll('.example.example-compact');
        }

        for (var i = 0; i < elements.length; ++i) {
            var example = elements[i];
            var toggle = Util.find(example, '.example-toggle');
            var copy = Util.find(example, '.example-copy');

            // Handle toggle
            Util.addEvent(toggle, 'click', function() {
                var example = this.closest('.example');
                var code =  Util.find(example, '.example-code');
                var the = this;

                if (Util.hasClass(this, 'example-toggled')) {
                    Util.slideUp(code, 300, function() {
                        Util.removeClass(the, 'example-toggled');
                        Util.removeClass(code, 'example-code-on');
                        Util.hide(code);
                    });
                } else {
                    Util.addClass(code, 'example-code-on');
                    Util.addClass(this, 'example-toggled');
                    Util.slideDown(code, 300, function() {
                        Util.show(code);
                    });
                }
            });

            // Handle copy
            var clipboard = new ClipboardJS(copy, {
                target: function(trigger) {
                    var example = trigger.closest('.example');
                    var el = Util.find(example, '.example-code .tab-pane.active');

                    if (!el) {
                        el = Util.find(example, '.example-code');
                    }

                    return el;
                }
            });

            clipboard.on('success', function(e) {
                Util.addClass(e.trigger, 'example-copied');
                e.clearSelection();

                setTimeout(function() {
                    Util.removeClass(e.trigger, 'example-copied');
                }, 2000);
            });
        }
    }

    return {
        init: function(element, options) {
            initDefaultMode(element);
            initCompactMode(element);
        }
    };
}();



export default LayoutExamples;
