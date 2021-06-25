const pict = require('../lib/pict').pict;
const readFileSync = require('fs').readFileSync;
const assert = require('assert');
const path = require('path');

describe('pict -sub models', () => {
  const jsonModel = {
    parameters: [
      { property: 'PLATFORM', values: ['x86', 'x64', 'arm'] },
      { property: 'CPUS', values: [1, 2, 4] },
      { property: 'RAM', values: ['1GB', '4GB', '64GB'] },
      { property: 'HDD', values: ['SCSI', 'IDE'] },
      { property: 'OS', values: ['Win7', 'Win8', 'Win10'] },
      { property: 'Browser', values: ['Edge', 'Opera', 'Chrome', 'Firefox'] },
      { property: 'APP', values: ['Word', 'Excel', 'Powerpoint'] },
    ],
    submodels: ['{ PLATFORM, CPUS, RAM, HDD } @ 3', '{ OS, Browser } @ 2'],
  };


  it('generates correct set of test cases', () => {
    const __dirname = path.resolve(path.dirname(''));

    const jsonString = readFileSync(
      path.resolve(__dirname, 'fixtures/submodels.json')
    );
    const expectedTests = JSON.parse(jsonString);

    let result = pict(jsonModel);
    assert.deepStrictEqual(result.testCases, expectedTests);
  });
});
