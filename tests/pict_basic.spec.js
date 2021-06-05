import Pict from '../lib/models/pict.js';
import fs from 'fs';
import assert from 'assert';
import path from 'path';

describe('pict -basic', () => {
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

  it.only('converts json to pict', () => {
    const model = pict.generateModel();
    const __dirname = path.resolve(path.dirname(''));
    fs.readFile(
      path.resolve(__dirname, 'models', model.generatedModelFile),
      'utf8',
      function (err, data) {
        assert.deepStrictEqual(
          data,
          `
Single: Span,Stripe,Mirror,RAID-5
Format method: Quick,Slow
File system: FAT,FAT32,NTFS
Compression: On,Off`
        );
      }
    );
  });

  xit('can execute', () => {
    console.log(pict.execute());
    // assert.strictEqual(2695, marketData.getTicks().length);
  });

  xit('getSaveModelFile()', () => {
    console.log(pict.saveModelFile());
    // assert.strictEqual(2695, marketData.getTicks().length);
  });
});
