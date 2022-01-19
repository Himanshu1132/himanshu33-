"use strict";

var LayoutContent = function() {
    // Private properties
    var _element;

	// Private functions
	var _getHeight = function() {
		var height;

		height = Util.getViewPort().height;

        if (_element) {
            height = height - parseInt(Util.css(_element, 'paddingTop')) - parseInt(Util.css(_element, 'paddingBottom'));
        }

        height = height - LayoutSubheader.getHeight();
        height = height - LayoutFooter.getHeight();

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



export default LayoutContent;
