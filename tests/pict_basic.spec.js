const pict = require('../lib/pict').pict;
const fs = require('fs');
const assert = require('assert');
const path = require('path');

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
    assert.deepStrictEqual(model.testCases, [
      {
        single: 'RAID-5',
        format_method: 'Quick',
        file_system: 'FAT32',
        compression: 'Off',
      },
      {
        single: 'Mirror',
        format_method: 'Quick',
        file_system: 'FAT',
        compression: 'On',
      },
      {
        single: 'Mirror',
        format_method: 'Slow',
        file_system: 'FAT32',
        compression: 'Off',
      },
      {
        single: 'Stripe',
        format_method: 'Slow',
        file_system: 'NTFS',
        compression: 'On',
      },
      {
        single: 'Span',
        format_method: 'Quick',
        file_system: 'NTFS',
        compression: 'Off',
      },
      {
        single: 'RAID-5',
        format_method: 'Slow',
        file_system: 'FAT',
        compression: 'On',
      },
      {
        single: 'RAID-5',
        format_method: 'Slow',
        file_system: 'NTFS',
        compression: 'Off',
      },
      {
        single: 'Stripe',
        format_method: 'Quick',
        file_system: 'FAT',
        compression: 'Off',
      },
      {
        single: 'Span',
        format_method: 'Slow',
        file_system: 'FAT32',
        compression: 'On',
      },
      {
        single: 'Mirror',
        format_method: 'Quick',
        file_system: 'NTFS',
        compression: 'On',
      },
      {
        single: 'Stripe',
        format_method: 'Quick',
        file_system: 'FAT32',
        compression: 'Off',
      },
      {
        single: 'Span',
        format_method: 'Slow',
        file_system: 'FAT',
        compression: 'Off',
      },
    ]);
  });
});
