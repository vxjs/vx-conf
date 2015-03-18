'use strict';

var path   = require('path');
var findup = require('findup');

module.exports = File;

/**
 * @constructor
 */
function File(options) {
  var filename = options.filename;
  var cwd      = options.cwd || process.cwd();
  var absPath;
  var dir;

  this.filename = filename;

  if (filename.indexOf('\\') === -1 && filename.indexOf('/') === -1) {
    try {
      this.dir = dir = findup.sync(cwd, filename);
    } catch (e) {
      this.data = {};
      return;
    }

    absPath = path.resolve(dir, filename);
  } else {
    absPath = path.resolve(cwd, filename);
  }

  this.data = require(absPath);
}

/**
 * @property data
 */
File.prototype.data = null;

/**
 * @property dir
 */
File.prototype.dir = null;

/**
 * @property filename
 */
File.prototype.filename = null;

/**
 * Return data object
 * @returns {object} data
 */
File.prototype.getData = function () {
  return this.data;
};

/**
 * Return meta data about this store
 */
File.prototype.getMeta = function () {
  return {
    type: 'file',
    dir: this.dir,
    filename: this.filename
  };
};
