"use strict";

var LayoutFooter = function() {
    // Private properties
    var _element;

	// Private functions
	var _getHeight = function() {
		var height = 0;

        if (_element) {
            height = Util.actualHeight(_element);
        }

		return height;
	}

    // Public methods
	return {
		init: function(id) {
            _element = Util.getById(id);
		},

		getHeight: function() {
			return _getHeight();
		},

        getElement: function() {
            return _element;
        }
	};
}();



export default LayoutFooter;
