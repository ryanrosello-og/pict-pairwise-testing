const pict = require('../lib/pict').pict;
const fs = require('fs');
const assert = require('assert');
const path = require('path');
const util = require('./test_helper');

describe('pict -basic', () => {
  const jsonModel = {
    parameters: [
      { property: 'Single', values: ['Span', 'Stripe', 'Mirror', 'RAID-5'] },
      { property: 'Format method', values: ['Quick', 'Slow'] },
      { property: 'File system', values: ['FAT', 'FAT32', 'NTFS'] },
      { property: 'Compression', values: ['On', 'Off'] },
    ],
  };

  let model;

  before(() => {
    model = pict(jsonModel);
  });

  it('converts json to pict', () => {
    const __dirname = path.resolve(path.dirname(''));
    fs.readFile(
      path.resolve(__dirname, 'models', model.generatedModelFile),
      'utf8',
      function (err, data) {
        // prettier-ignore
        assert.deepStrictEqual(
          data,
`Single: Span,Stripe,Mirror,RAID-5
Format method: Quick,Slow
File system: FAT,FAT32,NTFS
Compression: On,Off
`
        );
      }
    );
  });

  it('can execute', () => {
    let expectedTests = [];
    if (process.platform === 'darwin') {
      expectedTests = util.fetchExpectedData('basic.darwin');
    } else {
      expectedTests = util.fetchExpectedData('basic');
    }
    assert.deepStrictEqual(model.testCases, expectedTests);
  });
});
