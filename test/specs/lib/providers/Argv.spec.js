var Argv = v.lib('providers', 'Argv');

describe('Argv', function () {
  var instance;

  it('should return correct data', function () {
    global.process.argv = ['node', 'app', '--name', 'seth'];
    instance = new Argv();
    v.assert.deepEqual(instance.getData(), { name: 'seth' });
  });

  it('should return meta data', function () {
    instance = new Argv();
    v.assert.deepEqual(instance.getMeta(), { type: 'argv' });
  });

});
