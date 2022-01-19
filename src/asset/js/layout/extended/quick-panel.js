"use strict";

var LayoutQuickPanel = function() {
    // Private properties
    var _element;
    var _offcanvasObject;
    var _notificationsElement;
    var _logsElement;
    var _settingsElement;

    // Private functions
    var _getContentHeight = function() {
        var height;

        var header = Util.find(_element, '.offcanvas-header');
        var content = Util.find(_element, '.offcanvas-content');

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

        height = height - parseInt(Util.css(_element, 'paddingTop'));
        height = height - parseInt(Util.css(_element, 'paddingBottom'));

        height = height - 2;

        return height;
    }

    var _init = function() {
        _offcanvasObject = new Offcanvas(_element, {
            overlay: true,
            baseClass: 'offcanvas',
            placement: 'right',
            closeBy: 'quick_panel_close',
            toggleBy: 'quick_panel_toggle'
        });
    }

    var _initNotifications = function() {
        Util.scrollInit(_notificationsElement, {
            mobileNativeScroll: true,
            resetHeightOnDestroy: true,
            handleWindowResize: true,
            height: function() {
                return _getContentHeight();
            }
        });
    }

    var _initLogs = function() {
        Util.scrollInit(_logsElement, {
            mobileNativeScroll: true,
            resetHeightOnDestroy: true,
            handleWindowResize: true,
            height: function() {
                return _getContentHeight();
            }
        });
    }

    var _initSettings = function() {
        Util.scrollInit(_settingsElement, {
            mobileNativeScroll: true,
            resetHeightOnDestroy: true,
            handleWindowResize: true,
            height: function() {
                return _getContentHeight();
            }
        });
    }

    var _updateScrollbars = function() {
        $(_element).find('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            Util.scrollUpdate(_notificationsElement);
            Util.scrollUpdate(_logsElement);
            Util.scrollUpdate(_settingsElement);
        });
    }

    // Public methods
    return {
        init: function(id) {
            _element = Util.getById(id);
            _notificationsElement = Util.getById('quick_panel_notifications');
            _logsElement = Util.getById('quick_panel_logs');
            _settingsElement = Util.getById('quick_panel_settings');

            _init();
            _initNotifications();
            _initLogs();
            _initSettings();

            
        }
    };
}();



export default LayoutQuickPanel;
