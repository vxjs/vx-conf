var AnnotatedFile = v.lib('providers', 'AnnotatedFile');

describe('AnnotatedFile', function () {
  var instance;

  describe('parse file', function () {
    it('should find simple file', function () {
      instance = new AnnotatedFile({
        cwd: v.path('fixtures', 'a', 'b', 'c'),
        filename: 'test.js'
      });

      var expectedData = {
        include: [['foo.js'], ['bar.js']],
        template:[['two']]
      };

      v.assert.deepEqual(instance.getData(), expectedData);
    });

    it('should use simple file', function () {
      instance = new AnnotatedFile({
        filename: v.path('fixtures', 'a', 'b', 'c', 'test.js')
      });

      var expectedData = {
        include: [['foo.js'], ['bar.js']],
        template:[['two']]
      };

      v.assert.deepEqual(instance.getData(), expectedData);
    });

    it('should handle missing file', function () {
      instance = new AnnotatedFile({
        cwd: v.path('fixtures', 'a', 'b', 'c'),
        filename: 'testa9o8eu.js'
      });

      var expectedData = {};

      v.assert.deepEqual(instance.getData(), expectedData);
    });

    it('should handle missing file -- abs path', function () {
      instance = new AnnotatedFile({
        filename: v.path('fixtures', 'a', 'b', 'c', 'asnotehu.js')
      });

      var expectedData = {};

      v.assert.deepEqual(instance.getData(), expectedData);
    });
  });

  describe('meta data', function () {
    before(function () {
      instance = new AnnotatedFile({
        filename: v.path('fixtures', 'a', 'b', 'c', 'test.js')
      });
    });

    it('should return correct data', function () {
      var expectedData = {
        type: 'annotated_file',
        dir: v.path('fixtures', 'a', 'b', 'c'),
        filename: 'test.js'
      };

      v.assert.deepEqual(instance.getMeta(), expectedData);
    });
  });
});
