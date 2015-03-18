'use strict';

module.exports = Env;

/**
 * @constructor
 */
function Env() {}

/**
 * Return data object
 * @returns {object} data
 */
Env.prototype.getData = function () {
  return this.normalizeEnvData(process.env);
};

/**
 * Normalize environment variable data
 * @param {object} data
 * @returns {object} data
 */
Env.prototype.normalizeEnvData = function (data) {
  var result = {};

  Object.keys(data).forEach(function (key) {
    var formattedKey = key.toLowerCase();

    if (formattedKey.indexOf('.') === -1) {
      result[formattedKey] = data[key];
    } else {
      this.pathAdd(result, formattedKey, data[key]);
    }
  }, this);

  return result;
};

/**
 * Split property path and add value to object
 * @param {object} result
 * @param {string} key
 * @param {string} data
 * @returns {object} result
 */
Env.prototype.pathAdd = function (result, key, data) {
  var parts, subkey;

  if (typeof result !== 'object') {
    throw new Error('result parameter must be an object');
  }

  parts = key.split('.');

  if (parts.length === 1) {
    result[parts[0]] = data;
    return;
  }

  subkey = parts.shift();

  result[subkey] = {};
  return this.pathAdd(result[subkey], parts.join('.'), data);
};

/**
 * Return meta data about this store
 */
Env.prototype.getMeta = function () {
  return {
    type: 'env'
  };
};
