'use strict';

var minimist = require('minimist');

module.exports = Argv;

/**
 * @constructor
 */
function Argv() {
  this.data = minimist(process.argv.slice(2));
  delete this.data._;
}

/**
 * @property data
 */
Argv.prototype.data = null;

/**
 * Return data object
 * @returns {object} data
 */
Argv.prototype.getData = function () {
  return this.data;
};

/**
 * Return meta data about this store
 */
Argv.prototype.getMeta = function () {
  return {
    type: 'argv'
  };
};
