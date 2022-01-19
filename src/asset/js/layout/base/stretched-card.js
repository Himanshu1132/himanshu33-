"use strict";

var LayoutStretchedCard = function() {
    // Private properties
	var _element;

	// Private functions
	var _init = function() {
		var scroll = Util.find(_element, '.card-scroll');
		var cardBody = Util.find(_element, '.card-body');
		var cardHeader = Util.find(_element, '.card-header');

		var height = LayoutContent.getHeight();

		height = height - parseInt(Util.actualHeight(cardHeader));

		height = height - parseInt(Util.css(_element, 'marginTop')) - parseInt(Util.css(_element, 'marginBottom'));
		height = height - parseInt(Util.css(_element, 'paddingTop')) - parseInt(Util.css(_element, 'paddingBottom'));

		height = height - parseInt(Util.css(cardBody, 'paddingTop')) - parseInt(Util.css(cardBody, 'paddingBottom'));
		height = height - parseInt(Util.css(cardBody, 'marginTop')) - parseInt(Util.css(cardBody, 'marginBottom'));

		height = height - 3;

		Util.css(scroll, 'height', height + 'px');
	}

    // Public methods
	return {
		init: function(id) {
            _element = Util.getById(id);

            if (!_element) {
                return;
            }

            // Initialize
			_init();

            // Re-calculate on window resize
            Util.addResizeHandler(function() {
				_init();
			});
		},

		update: function() {
			_init();
		}
	};
}();



export default LayoutStretchedCard;
