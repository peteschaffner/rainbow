
/**
 * Module dependencies.
 */

var css = require('css');
var Sinebow = require('sinebow');

/**
 * Expose `Rainbow`.
 */

module.exports = Rainbow;

/**
 * Initialize a new `Rainbow` for the given `el`.
 *
 * @param {Element} el Target element to rainbowify.
 * @param {Object} opts
 * @api public
 */

function Rainbow(el, opts) {
  if (!(this instanceof Rainbow)) return new Rainbow(el, opts);
  opts = opts || {};
  this.el = el;
  this.rate = opts.rate || 120000; // 2 mins to travel around the color wheel
  this.prop = opts.property || 'background-color';
  this.saturation = opts.saturation;
  this.brightness = opts.brightness;
}

/**
 * Paint `el` all the colors of the rainbow.
 *
 * @api public
 */

Rainbow.prototype.paint = function () {
  var self = this;
  animate();
  function animate() {
    var hue = new Date().getTime() / self.rate;
    var color = new Sinebow(hue);
    if (self.saturation) color.desaturate(self.saturation);
    if (self.brightness) color.darken(self.brightness);
    css(self.el, self.prop, color.toString());
    self.timer = setTimeout(animate, 100);
  }
};

/**
 * Stop painting.
 *
 * @api public
 */

Rainbow.prototype.stop = function () {
  clearTimeout(this.timer);
};
