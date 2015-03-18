'use strict';

module.exports = {
  /**
   * Capitalize a string
   * @param {string} str
   * @return {string} capitalized string
   */
  capitalize: function (str) {
    if (str) {
      str = str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
    }

    return str;
  },

  /**
   * Insert item in an array at specified position
   * @param {array} list
   * @param {object} item
   * @param {number} idx
   * @returns {array}
   */
  insert: function (list, item, idx) {
    if (idx > list.length) {
      idx = list.length;
    } else if (idx < 0) {
      idx = 0;
    }

    return list.slice(0, idx).concat(item).concat(list.slice(idx));
  }
};
