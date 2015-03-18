var Literal = v.lib('providers', 'Literal');

describe('Literal', function () {
  it('should return the correct data', function () {
    instance = new Literal({
      data: {
        name: 'seth'
      }
    });

    var expectedData = { name: 'seth' };

    v.assert.deepEqual(instance.getData(), expectedData);
  });

  it('should return empty object', function () {
    instance = new Literal({
      name: 'foo'
    });

    var expectedData = {};

    v.assert.deepEqual(instance.getData(), expectedData);
  });
});
