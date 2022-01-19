"use strict";

var LayoutHeaderMobile = function() {
    // Private properties
    var _element;
    var _object;

    // Get height
    var _getHeight = function() {
        var height;

        height = Util.actualHeight(_element);

        return height;
    }

    // Public methods
	return {
		init: function(id) {
            _element = Util.getById(id);
		},

        isFixed: function() {
            return Util.hasClass(Util.getBody(), 'header-mobile-fixed')
        },

        getElement: function() {
            return _element;
        },

        getHeader: function() {
            return _object;
        },

        getHeight: function() {
            return _getHeight();
        }
	};
}();



export default LayoutHeaderMobile;
