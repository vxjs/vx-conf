'use strict';

var util      = require('./util');
var providers = require('require-dir')('./providers');

module.exports = Conf;

/**
 * @constructor
 */
function Conf() {
  this.stores = [];
}

/**
 * @property {array}
 * @default
 */
Conf.prototype.stores = null;

/**
 * Add value store to configuration
 * @param {object} store
 * @param {number} [priority] position to insert in lookup chain
 */
Conf.prototype.addStore = function (store, priority) {
  var providerName = util.capitalize(store.provider);
  var ProviderFn   = providers[providerName];
  var provider     = new ProviderFn(store);

  if (typeof priority === 'undefined') {
    this.stores.unshift(provider);
  } else {
    this.stores = util.insert(this.stores, provider, priority);
  }
};

/**
 * Get value from configuration
 * @param {string} key The key of the value to retrieve
 * @return {object}
 */
Conf.prototype.get = function (key) {
  return this.getWithMeta(key).value;
};

/**
 * Get value from configuration
 * @param {string} key The key of the value to retrieve
 * @return {object}
 */
Conf.prototype.getWithMeta = function (key) {
  var value;
  var meta;

  this.stores.some(function (store) {
    value = this.lookupValue(key, store.getData());

    if (value !== undefined) {
      meta = store.getMeta();
      return true;
    }

    return false;
  }, this);

  return {
    value: value,
    meta: meta
  };
};

/**
 * Look up property path in object literal
 * @param {string} key
 * @param {object} data
 * @return {object} value
 */
Conf.prototype.lookupValue = function (key, data) {
  var parts, firstPart, value;

  if (key && key.split) {
    parts     = key.split('.');
    firstPart = parts.shift();
    value     = data[firstPart];
  } else {
    return undefined;
  }

  if (parts.length === 0) {
    return value;
  }

  if (typeof value !== 'object' && parts.length > 0) {
    return undefined;
  }

  return this.lookupValue(parts.join('.'), value);
};
