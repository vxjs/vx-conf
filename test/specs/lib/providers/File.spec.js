var File = v.lib('providers', 'File');

describe('File', function () {
  var instance;

  describe('search for file', function () {
    it('should find the right file', function () {
      instance = new File({
        cwd: v.path('fixtures', 'a', 'b', 'c'),
        filename: 'config.json'
      });

      var expectedData = require(v.path('fixtures', 'a', 'config.json'));

      v.assert.deepEqual(instance.getData(), expectedData);
    });
  });

  describe('search for missing file', function () {
    it('should return empty object', function () {
      instance = new File({
        cwd: v.path('fixtures', 'a', 'b', 'c'),
        filename: 'config.jsonrchnth'
      });

      var expectedData = {};

      v.assert.deepEqual(instance.getData(), expectedData);
    });
  });

  describe('absolute path', function () {
    it('should find the right file', function () {
      var cwd = process.cwd;

      process.cwd = function () {
        return v.path('fixtures', 'a', 'b', 'c');
      };

      instance = new File({
        filename: '../../config.json'
      });

      var expectedData = require(v.path('fixtures', 'a', 'config.json'));

      v.assert.deepEqual(instance.getData(), expectedData);

      process.cwd = cwd;
    });
  });
});
