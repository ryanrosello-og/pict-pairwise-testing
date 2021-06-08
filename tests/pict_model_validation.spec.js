import Pict from '../lib/pict.js';
import assert from 'assert';

describe('pict - model validation', () => {
  it('constraints must end with a ; character', () => {
    let pict = new Pict({
      parameters: [
        { property: 'Size', values: [10, 100, 500, 1000, 5000, 10000, 40000] },
        { property: 'Format method', values: ['quick', 'slow'] },
        { property: 'Format method', values: ['quick', 'slow'] },
        { property: 'File system', values: ['FAT', 'FAT32', 'NTFS'] },
      ],
    });

    let result = pict.generateTestCases();
    assert.match(
      result.command,
      /Command failed: .\/binaries\/pict_nix.*_generated.model/
    );
    assert.strictEqual(
      result.error,
      'Input Error: A parameter names must be unique'
    );
  });
  it('values can either be string or numeric');
  it('values cannot be empty');
});