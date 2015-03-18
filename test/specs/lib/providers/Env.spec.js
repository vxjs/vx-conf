var Env = v.lib('providers', 'Env');

describe('Env', function () {
  var instance;

  beforeEach(function () {
    instance = new Env();
  });

  describe('normalizeEnvData', function () {
    var envData;
    var result;
    var expectedResult;

    it('should return correct data', function () {
      envData = {
        'NAME': 'seth',
        'Age': '89',
        'address.CITY': 'palo alto'
      };

      expectedResult = {
        name: 'seth',
        age: '89',
        address: {
          city: 'palo alto'
        }
      };

      result = instance.normalizeEnvData(envData);

      v.assert.deepEqual(result, expectedResult);
    });
  });

  describe('pathAdd', function () {
    var result;
    var expectedResult;

    it('should return correct data', function () {
      result = {
        name: {
          first: 'seth'
        }
      };

      expectedResult = {
        name: {
          first: 'seth'
        },

        address: {
          home: {
            city: 'mt. view'
          }
        }
      };

      instance.pathAdd(result, 'address.home.city', 'mt. view');

      v.assert.deepEqual(result, expectedResult);
    });

    it('should return correct data', function () {
      var error = false;

      result = undefined;

      expectedResult = {
        address: {
          home: {
            city: 'mt. view'
          }
        }
      };

      try {
        instance.pathAdd(result, 'address.home.city', 'mt. view');
      } catch (e) {
        error = true;
      }

      v.assert.equal(error, true);
    });
  });

  describe('getData', function () {
    var result;
    var expectedResult;

    it('should return correct data', function () {
      global.process.env = {
        'FOO.bAR.foo': 'biz'
      };

      expectedResult = {
        foo: {
          bar: {
            foo: 'biz'
          }
        }
      };

      result = instance.getData();

      v.assert.deepEqual(result, expectedResult);
    });
  });

  describe('getMeta', function () {
    it('should return meta data', function () {
      v.assert.deepEqual(instance.getMeta(), { type: 'env' });
    });
  });
});
