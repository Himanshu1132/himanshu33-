"use strict";

var LayoutStickyCard = function() {
    // Private properties
	var _element;
    var _object;

	// Private functions
	var _init = function() {
		var offset = 300;

		if (typeof LayoutHeader !== 'undefined') {
			offset = LayoutHeader.getHeight();
		}

        _object = new Card(_element, {
			sticky: {
				offset: offset,
				zIndex: 90,
				position: {
					top: function() {
						var pos = 0;
                        var body = Util.getBody();

						if (Util.isBreakpointUp('lg')) {
							if (typeof LayoutHeader !== 'undefined' && LayoutHeader.isFixed()) {
								pos = pos + LayoutHeader.getHeight();
							}

							if (typeof LayoutSubheader !== 'undefined' && LayoutSubheader.isFixed()) {
								pos = pos + LayoutSubheader.getHeight();
							}
						} else {
							if (typeof LayoutHeader !== 'undefined' && LayoutHeader.isFixedForMobile()) {
								pos = pos + LayoutHeader.getHeightForMobile();
							}
						}

						pos = pos - 1; // remove header border width

						return pos;
					},
					left: function(card) {
						return Util.offset(_element).left;
					},
					right: function(card) {
						var body = Util.getBody();

						var cardWidth = parseInt(Util.css(_element, 'width'));
						var bodyWidth = parseInt(Util.css(body, 'width'));
						var cardOffsetLeft = Util.offset(_element).left;

						return bodyWidth - cardWidth - cardOffsetLeft;
					}
				}
			}
		});

		_object.initSticky();

		Util.addResizeHandler(function() {
			_object.updateSticky();
		});
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
		},

		update: function() {
			if (_object) {
				_object.updateSticky();
			}
		}
	};
}();



export default LayoutStickyCard;
