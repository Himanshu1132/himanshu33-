'use strict';

/**
 * @class Crop class provides image cropping helper functions
 */

var Gui = function (cmp) {
  // Main object
  var the = this;

  //////////////////////////
  // * Public Functions * //
  //////////////////////////

  /**
   * Message Reporting
   */
  the.toast = function (messages, title = 'Request Error', variant = 'danger') {
    if (!Array.isArray(messages)) {
      switch (typeof messages) {
        case 'string':
          messages = [messages];
          break;
        case 'object':
          messages = messages.errors;
          break;
      }
    }
    for (let message of messages) {
      cmp.$bvToast.toast(message, {
        title: title,
        variant: variant,
        solid: true,
        noAutoHide: true
      });
    }
  };

  /**
   * Confirm Box
   */
  the.rmTarget = function (question) {
    return cmp.$bvModal
      .msgBoxConfirm(question, {
        contentClass: 'rounded-0',
        size: 'sm',
        okVariant: 'danger',
        okTitle: 'YES',
        cancelTitle: 'NO',
        footerClass: 'p-0 border-top border-top-light-dark'
      })
      .catch((ex) => {
        window.alert(ex);
      });
  };

  return the;
};

// webpack support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = Gui;
}

export default Gui;
