import Pict from '../lib/pict.js';
import fs from 'fs';
import assert from 'assert';

describe.skip('pict -constraints', () => {
  const jsonModel = {
    parameters: [
      { property: 'Single', values: ['Span', 'Stripe', 'Mirror', 'RAID-5'] },
      { property: 'Format method', values: ['Quick', 'Slow'] },
      { property: 'File system', values: ['FAT', 'FAT32', 'NTFS'] },
      { property: 'Compression', values: ['On', 'Off'] },
    ],
  };
  let pict;

  before(() => {
    pict = new Pict(jsonModel);
  });

  it('converts json to pict', () => {
    console.log(pict.getModel());
    // assert.strictEqual(2695, marketData.getTicks().length);
  });

  it('can execute', () => {
    console.log(pict.execute());
    // assert.strictEqual(2695, marketData.getTicks().length);
  });

  it('getSaveModelFile()', () => {
    console.log(pict.getSaveModelFile());
    // assert.strictEqual(2695, marketData.getTicks().length);
  });
});
