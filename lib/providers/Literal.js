'use strict';

module.exports = Literal;

/**
 * @constructor
 */
function Literal(options) {
  this.data = options.data || {};
}

/**
 * @property data
 */
Literal.prototype.data = null;

/**
 * Return data object
 * @returns {object} data
 */
Literal.prototype.getData = function () {
  return this.data;
};

/**
 * Return meta data about this store
 */
Literal.prototype.getMeta = function () {
  return {
    type: 'literal'
  };
};
