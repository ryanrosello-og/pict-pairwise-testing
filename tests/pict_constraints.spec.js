const pict = require('../lib/pict').pict;
const assert = require('assert');

describe('pict -constraints', () => {
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
  if (process.platform !== 'darwin') {
    it('converts json to pict', () => {
      let result = pict(jsonModel);

      assert.deepStrictEqual(result.testCases, [
        {
          type: 'Span',
          size: '5000',
          format_method: 'quick',
          file_system: 'FAT32',
          cluster_size: '32768',
          compression: 'on',
        },
        {
          type: 'Mirror',
          size: '10000',
          format_method: 'slow',
          file_system: 'NTFS',
          cluster_size: '512',
          compression: 'off',
        },
        {
          type: 'Logical',
          size: '10',
          format_method: 'quick',
          file_system: 'FAT',
          cluster_size: '16384',
          compression: 'off',
        },
        {
          type: 'Single',
          size: '10',
          format_method: 'slow',
          file_system: 'NTFS',
          cluster_size: '65536',
          compression: 'on',
        },
        {
          type: 'Single',
          size: '100',
          format_method: 'quick',
          file_system: 'FAT32',
          cluster_size: '4096',
          compression: 'off',
        },
        {
          type: 'Stripe',
          size: '1000',
          format_method: 'slow',
          file_system: 'FAT',
          cluster_size: '512',
          compression: 'on',
        },
        {
          type: 'RAID-5',
          size: '1000',
          format_method: 'quick',
          file_system: 'NTFS',
          cluster_size: '4096',
          compression: 'on',
        },
        {
          type: 'RAID-5',
          size: '10000',
          format_method: 'slow',
          file_system: 'FAT32',
          cluster_size: '32768',
          compression: 'off',
        },
        {
          type: 'Mirror',
          size: '500',
          format_method: 'quick',
          file_system: 'FAT32',
          cluster_size: '8192',
          compression: 'on',
        },
        {
          type: 'RAID-5',
          size: '40000',
          format_method: 'slow',
          file_system: 'NTFS',
          cluster_size: '16384',
          compression: 'on',
        },
        {
          type: 'Span',
          size: '500',
          format_method: 'slow',
          file_system: 'NTFS',
          cluster_size: '512',
          compression: 'off',
        },
        {
          type: 'Primary',
          size: '1000',
          format_method: 'quick',
          file_system: 'FAT32',
          cluster_size: '2048',
          compression: 'off',
        },
        {
          type: 'Mirror',
          size: '100',
          format_method: 'quick',
          file_system: 'FAT',
          cluster_size: '1024',
          compression: 'off',
        },
        {
          type: 'Primary',
          size: '10000',
          format_method: 'slow',
          file_system: 'NTFS',
          cluster_size: '1024',
          compression: 'on',
        },
        {
          type: 'Stripe',
          size: '1000',
          format_method: 'quick',
          file_system: 'FAT',
          cluster_size: '65536',
          compression: 'off',
        },
        {
          type: 'Logical',
          size: '500',
          format_method: 'slow',
          file_system: 'FAT',
          cluster_size: '32768',
          compression: 'on',
        },
        {
          type: 'Logical',
          size: '5000',
          format_method: 'slow',
          file_system: 'FAT32',
          cluster_size: '65536',
          compression: 'off',
        },
        {
          type: 'Stripe',
          size: '100',
          format_method: 'slow',
          file_system: 'NTFS',
          cluster_size: '16384',
          compression: 'on',
        },
        {
          type: 'Logical',
          size: '40000',
          format_method: 'quick',
          file_system: 'NTFS',
          cluster_size: '1024',
          compression: 'off',
        },
        {
          type: 'Primary',
          size: '100',
          format_method: 'quick',
          file_system: 'FAT',
          cluster_size: '65536',
          compression: 'off',
        },
        {
          type: 'Primary',
          size: '10',
          format_method: 'quick',
          file_system: 'FAT32',
          cluster_size: '512',
          compression: 'off',
        },
        {
          type: 'RAID-5',
          size: '10',
          format_method: 'quick',
          file_system: 'FAT32',
          cluster_size: '1024',
          compression: 'on',
        },
        {
          type: 'Mirror',
          size: '5000',
          format_method: 'slow',
          file_system: 'NTFS',
          cluster_size: '2048',
          compression: 'on',
        },
        {
          type: 'Stripe',
          size: '5000',
          format_method: 'slow',
          file_system: 'NTFS',
          cluster_size: '8192',
          compression: 'off',
        },
        {
          type: 'Stripe',
          size: '40000',
          format_method: 'quick',
          file_system: 'NTFS',
          cluster_size: '2048',
          compression: 'on',
        },
        {
          type: 'Single',
          size: '100',
          format_method: 'slow',
          file_system: 'NTFS',
          cluster_size: '32768',
          compression: 'off',
        },
        {
          type: 'Single',
          size: '5000',
          format_method: 'slow',
          file_system: 'FAT32',
          cluster_size: '512',
          compression: 'on',
        },
        {
          type: 'RAID-5',
          size: '100',
          format_method: 'quick',
          file_system: 'FAT',
          cluster_size: '512',
          compression: 'off',
        },
        {
          type: 'Span',
          size: '10',
          format_method: 'slow',
          file_system: 'FAT',
          cluster_size: '4096',
          compression: 'off',
        },
        {
          type: 'Stripe',
          size: '5000',
          format_method: 'slow',
          file_system: 'FAT32',
          cluster_size: '4096',
          compression: 'on',
        },
        {
          type: 'Single',
          size: '1000',
          format_method: 'slow',
          file_system: 'FAT',
          cluster_size: '8192',
          compression: 'on',
        },
        {
          type: 'Primary',
          size: '500',
          format_method: 'slow',
          file_system: 'FAT',
          cluster_size: '4096',
          compression: 'on',
        },
        {
          type: 'RAID-5',
          size: '5000',
          format_method: 'quick',
          file_system: 'NTFS',
          cluster_size: '1024',
          compression: 'on',
        },
        {
          type: 'Span',
          size: '10000',
          format_method: 'quick',
          file_system: 'FAT32',
          cluster_size: '16384',
          compression: 'off',
        },
        {
          type: 'Logical',
          size: '10000',
          format_method: 'quick',
          file_system: 'FAT32',
          cluster_size: '4096',
          compression: 'off',
        },
        {
          type: 'Span',
          size: '1000',
          format_method: 'slow',
          file_system: 'FAT32',
          cluster_size: '1024',
          compression: 'on',
        },
        {
          type: 'Mirror',
          size: '1000',
          format_method: 'slow',
          file_system: 'FAT32',
          cluster_size: '65536',
          compression: 'on',
        },
        {
          type: 'Logical',
          size: '100',
          format_method: 'slow',
          file_system: 'FAT',
          cluster_size: '512',
          compression: 'on',
        },
        {
          type: 'Single',
          size: '40000',
          format_method: 'quick',
          file_system: 'NTFS',
          cluster_size: '512',
          compression: 'off',
        },
        {
          type: 'Span',
          size: '100',
          format_method: 'quick',
          file_system: 'NTFS',
          cluster_size: '8192',
          compression: 'off',
        },
        {
          type: 'Logical',
          size: '100',
          format_method: 'quick',
          file_system: 'FAT',
          cluster_size: '2048',
          compression: 'on',
        },
        {
          type: 'Primary',
          size: '40000',
          format_method: 'quick',
          file_system: 'NTFS',
          cluster_size: '8192',
          compression: 'on',
        },
        {
          type: 'RAID-5',
          size: '10000',
          format_method: 'slow',
          file_system: 'NTFS',
          cluster_size: '65536',
          compression: 'off',
        },
        {
          type: 'Single',
          size: '10000',
          format_method: 'quick',
          file_system: 'NTFS',
          cluster_size: '2048',
          compression: 'off',
        },
        {
          type: 'Stripe',
          size: '500',
          format_method: 'quick',
          file_system: 'FAT32',
          cluster_size: '1024',
          compression: 'on',
        },
        {
          type: 'Logical',
          size: '10000',
          format_method: 'quick',
          file_system: 'NTFS',
          cluster_size: '8192',
          compression: 'on',
        },
        {
          type: 'Mirror',
          size: '10',
          format_method: 'slow',
          file_system: 'FAT',
          cluster_size: '32768',
          compression: 'off',
        },
        {
          type: 'RAID-5',
          size: '500',
          format_method: 'quick',
          file_system: 'NTFS',
          cluster_size: '2048',
          compression: 'off',
        },
        {
          type: 'Mirror',
          size: '40000',
          format_method: 'quick',
          file_system: 'NTFS',
          cluster_size: '4096',
          compression: 'on',
        },
        {
          type: 'Span',
          size: '500',
          format_method: 'slow',
          file_system: 'FAT32',
          cluster_size: '65536',
          compression: 'on',
        },
        {
          type: 'Primary',
          size: '1000',
          format_method: 'slow',
          file_system: 'FAT',
          cluster_size: '32768',
          compression: 'on',
        },
        {
          type: 'Single',
          size: '500',
          format_method: 'quick',
          file_system: 'NTFS',
          cluster_size: '1024',
          compression: 'off',
        },
        {
          type: 'Stripe',
          size: '10',
          format_method: 'quick',
          file_system: 'FAT',
          cluster_size: '2048',
          compression: 'off',
        },
        {
          type: 'RAID-5',
          size: '10',
          format_method: 'quick',
          file_system: 'NTFS',
          cluster_size: '8192',
          compression: 'on',
        },
        {
          type: 'Primary',
          size: '1000',
          format_method: 'quick',
          file_system: 'FAT',
          cluster_size: '16384',
          compression: 'off',
        },
        {
          type: 'Logical',
          size: '1000',
          format_method: 'slow',
          file_system: 'NTFS',
          cluster_size: '1024',
          compression: 'on',
        },
        {
          type: 'Span',
          size: '40000',
          format_method: 'slow',
          file_system: 'NTFS',
          cluster_size: '65536',
          compression: 'on',
        },
        {
          type: 'Stripe',
          size: '10000',
          format_method: 'quick',
          file_system: 'FAT32',
          cluster_size: '32768',
          compression: 'on',
        },
        {
          type: 'Mirror',
          size: '500',
          format_method: 'quick',
          file_system: 'FAT',
          cluster_size: '16384',
          compression: 'off',
        },
        {
          type: 'RAID-5',
          size: '40000',
          format_method: 'slow',
          file_system: 'NTFS',
          cluster_size: '32768',
          compression: 'off',
        },
        {
          type: 'Span',
          size: '500',
          format_method: 'quick',
          file_system: 'FAT32',
          cluster_size: '2048',
          compression: 'on',
        },
        {
          type: 'Primary',
          size: '5000',
          format_method: 'slow',
          file_system: 'NTFS',
          cluster_size: '16384',
          compression: 'off',
        },
        {
          type: 'Single',
          size: '5000',
          format_method: 'quick',
          file_system: 'FAT32',
          cluster_size: '16384',
          compression: 'on',
        },
      ]);
    });
  }
});
