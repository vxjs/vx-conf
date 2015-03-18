'use strict';

var path             = require('path');
var fs               = require('fs');
var findup           = require('findup');
var parseAnnotations = require('vx-annotations');

module.exports = AnnotatedFile;

/**
 * @constructor
 */
function AnnotatedFile(options) {
  var filename = options.filename;
  var cwd      = options.cwd || process.cwd();
  var absPath;
  var dir;

  if (filename.indexOf('\\') === -1 && filename.indexOf('/') === -1) {
    try {
      dir = findup.sync(cwd, filename);
    } catch (e) {
      this.data = {};
      return;
    }

    absPath = path.resolve(dir, filename);
  } else {
    absPath = path.resolve(cwd, filename);
  }

  this.dir      = path.dirname(absPath);
  this.filename = path.basename(absPath);
  this.data     = this.parseFile(absPath);
}

/**
 * @property data
 */
AnnotatedFile.prototype.data = null;

/**
 * @property dir
 */
AnnotatedFile.prototype.dir = null;

/**
 * @property filename
 */
AnnotatedFile.prototype.filename = null;

/**
 * Return data object
 * @returns {object} data
 */
AnnotatedFile.prototype.getData = function () {
  return this.data;
};

/**
 * Return meta data about this store
 */
AnnotatedFile.prototype.getMeta = function () {
  return {
    type: 'annotated_file',
    dir: this.dir,
    filename: this.filename
  };
};

/**
 * Parse annotations from file
 * @param {string} filename Absolute path to file
 * @returns {object}
 */
AnnotatedFile.prototype.parseFile = function (filename) {
  var contents, result;

  try {
    contents = fs.readFileSync(filename).toString();
    result   = this.parse(contents);
  } catch (e) {
    result = {};
  }

  return result;
};

/**
 * Parse annotations from text
 * @param {string} text Text to parse
 * @returns {object}
 */
AnnotatedFile.prototype.parse = function (text) {
  return parseAnnotations(text);
};
