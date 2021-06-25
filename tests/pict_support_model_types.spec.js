const pict = require('../lib/pict').pict;
const assert = require('assert');
const path = require('path');

describe('pict - describe model as text or from file', () => {
  it('can execute text based model', () => {
    let result = pict(`
      Status: Open,Closed
      Threshold: 10,100,500
      Approved: Yes, No
    `);

    assert.deepStrictEqual(result.testCases, [
      { status: 'Open', threshold: '100', approved: 'No' },
      { status: 'Closed', threshold: '10', approved: 'No' },
      { status: 'Closed', threshold: '500', approved: 'Yes' },
      { status: 'Closed', threshold: '100', approved: 'Yes' },
      { status: 'Open', threshold: '10', approved: 'Yes' },
      { status: 'Open', threshold: '500', approved: 'No' },
    ]);
  });

  it('can generate model from static file', () => {
    const __dirname = path.resolve(path.dirname(''));
    const modelFile = path.resolve(__dirname, 'fixtures/test-based.model');

    let results = pict(modelFile);
    assert.deepStrictEqual(results.testCases, [
      { status: 'Open', threshold: '100', approved: 'No' },
      { status: 'Closed', threshold: '10', approved: 'No' },
      { status: 'Closed', threshold: '500', approved: 'Yes' },
      { status: 'Closed', threshold: '100', approved: 'Yes' },
      { status: 'Open', threshold: '10', approved: 'Yes' },
      { status: 'Open', threshold: '500', approved: 'No' },
    ]);
  });
});
