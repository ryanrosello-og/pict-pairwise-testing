import Pict from '../lib/pict.js';
import assert from 'assert';

describe('pict - describe model as text or from file', () => {
  it('can execute text based model', () => {
    let pict = new Pict(`
        Status: Open,Closed
        Threshold: 10,100,500
        Approved: Yes, No
    `);

    let model = pict.generateTestCases();
    assert.deepStrictEqual(model.testCases, [
      { status: 'Open', threshold: '100', approved: 'No' },
      { status: 'Closed', threshold: '10', approved: 'No' },
      { status: 'Closed', threshold: '500', approved: 'Yes' },
      { status: 'Closed', threshold: '100', approved: 'Yes' },
      { status: 'Open', threshold: '10', approved: 'Yes' },
      { status: 'Open', threshold: '500', approved: 'No' },
    ]);
  });
});
