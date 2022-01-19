'use strict';

/**
 * @class Crop class provides image cropping helper functions
 */

var Crop = function (cmp) {
  // Main object
  var the = this;

  //////////////////////////
  // * Public Functions * //
  //////////////////////////

  /**
   * File Change Event
   */
  the.set = function (e) {
    cmp.cropper.active = true;
    const file = e.target.files[0];
    cmp.cropper.type = file.type;
    if (file.type.indexOf('image/') === -1) {
      alert('Please select an image file');
      return;
    }
    if (typeof FileReader === 'function') {
      const reader = new FileReader();
      reader.onload = (event) => {
        cmp.cropper.src = event.target.result;
        // rebuild cropperjs with the updated source
        cmp.$refs.cropper.replace(event.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Sorry, FileReader API not supported');
    }
  };

  /**
   * Remove New Image
   */
  the.rm = function () {
    cmp.pic = { base64: null, ext: null, width: 0, height: 0, description: null };
    cmp.cropper = { active: false, src: null, type: null, dimensions: { width: 0, height: 0 } };
  };

  /**
   * Actual Image Crop
   */
  the.crop = function (dim = false, keepalive = false) {
    // get image data for post processing, e.g. upload or setting image src
    const canvas = dim === false ? cmp.$refs.cropper.getCroppedCanvas() : cmp.$refs.cropper.getCroppedCanvas(dim);
    cmp.cropper.landscape = canvas.width > canvas.height;
    cmp.pic.base64 = canvas.toDataURL(cmp.cropper.type);
    cmp.pic.ext = cmp.cropper.type.split('/')[1];
    cmp.pic.width = canvas.width;
    cmp.pic.height = canvas.height;
    cmp.cropper.active = keepalive;
  };

  //////////////////////////
  // * Img Manipulation * //
  //////////////////////////

  the.flipX = function () {
    const dom = cmp.$refs.flipX;
    let scale = dom.getAttribute('data-scale');
    scale = scale ? -scale : -1;
    cmp.$refs.cropper.scaleX(scale);
    dom.setAttribute('data-scale', scale);
  };
  the.flipY = function () {
    const dom = cmp.$refs.flipY;
    let scale = dom.getAttribute('data-scale');
    scale = scale ? -scale : -1;
    cmp.$refs.cropper.scaleY(scale);
    dom.setAttribute('data-scale', scale);
  };
  the.move = function (offsetX, offsetY) {
    cmp.$refs.cropper.move(offsetX, offsetY);
  };
  the.reset = function () {
    cmp.$refs.cropper.reset();
  };
  the.rotate = function (deg) {
    cmp.$refs.cropper.rotate(deg);
  };
  the.zoom = function (percent) {
    cmp.$refs.cropper.relativeZoom(percent);
  };

  return the;
};

// webpack support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = Crop;
}

export default Crop;
