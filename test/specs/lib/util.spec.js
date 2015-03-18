var util = v.lib('util');

describe('util', function () {
  describe('capitalize', function () {
    var a, b, c, d;

    before(function () {
      a = util.capitalize('ABcD');
      b = util.capitalize('aBCD');
      c = util.capitalize('abcd');
      d = util.capitalize();
    });

    it('should capitalize mixed case 1', function () {
      v.assert.equal(a, 'Abcd');
    });

    it('should capitalize mixed case 2', function () {
      v.assert.equal(b, 'Abcd');
    });

    it('should capitalize all lowercase', function () {
      v.assert.equal(c, 'Abcd');
    });

    it('should return undefined', function () {
      v.assert.equal(d, undefined);
    });
  });

  describe('insert', function () {
    it('should insert item at position 0', function () {
      var list = util.insert([1, 2, 3, 4, 5], 'X', 0);

      v.assert.deepEqual(list, ['X', 1, 2, 3, 4, 5]);
    });

    it('should insert item at end', function () {
      var list = util.insert([1, 2, 3, 4, 5], 'X', 10);

      v.assert.deepEqual(list, [1, 2, 3, 4, 5, 'X']);
    });

    it('should insert item at beginning', function () {
      var list = util.insert([1, 2, 3, 4, 5], 'X', -2);

      v.assert.deepEqual(list, ['X', 1, 2, 3, 4, 5]);
    });

    it('should insert item at beginning', function () {
      var list = util.insert([], 'X', -2);

      v.assert.deepEqual(list, ['X']);
    });

    it('should insert item at position 2', function () {
      var list = util.insert([1, 2, 3, 4, 5], 'X', 2);

      v.assert.deepEqual(list, [1, 2, 'X', 3, 4, 5]);
    });
  });
});
