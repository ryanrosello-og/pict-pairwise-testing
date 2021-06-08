import Pict from '../lib/pict.js';
import assert from 'assert';

describe('pict - model validation', () => {
  let pict;
  let model;

  const jsonModel = {
    parameters: [
      {
        property: 'Type',
        values: [
          'Primary',
          'Logical',
          'Single',
          'Span',
          'Stripe',
          'Mirror',
          'RAID-5',
        ],
      },
      { property: 'Size', values: [10, 100, 500, 1000, 5000, 10000, 40000] },
      { property: 'Format method', values: ['quick', 'slow'] },
      { property: 'File system', values: ['FAT', 'FAT32', 'NTFS'] },
      {
        property: 'Cluster size',
        values: [512, 1024, 2048, 4096, 8192, 16384, 32768, 65536],
      },
      { property: 'Compression', values: ['on', 'off'] },
    ],
    constraints: [
      'IF [File system] = "FAT"   THEN [Size] <= 4096;',
      'IF [File system] = "FAT32" THEN [Size] <= 32000;',
    ],
  };

  before(() => {
    pict = new Pict(jsonModel);
  });

  it('constraints must end with a ; character');
  it('values can either be string or numeric');
  it('values cannot be empty');

  
});
