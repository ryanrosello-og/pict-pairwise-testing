const pict = require('../lib/pict').pict;
const assert = require('assert');

describe('pict - command line arguments', () => {
  const model = {
    parameters: [
      { property: 'Status', values: ['Open', 'Closed'] },
      { property: 'Threshold', values: [10, 100, 500] },
      { property: 'Approved', values: ['yes', 'no'] },
    ],
  };

  it('accepts order_of_combinations cli argument', () => {
    let result = pict(model, {
      options: { order_of_combinations: 1 },
    });

    assert.deepStrictEqual(result.testCases, [
      { status: 'Closed', threshold: '100', approved: 'no' },
      { status: 'Open', threshold: '500', approved: 'yes' },
      { status: 'Open', threshold: '10', approved: 'yes' },
    ]);
  });

  it('accepts randomize_generation cli argument', () => {
    let result = pict(model, {
      options: { randomize_generation: 10 },
    });

    assert.deepStrictEqual(result.testCases, [
      { status: 'Closed', threshold: '100', approved: 'no' },
      { status: 'Open', threshold: '10', approved: 'no' },
      { status: 'Open', threshold: '500', approved: 'no' },
      { status: 'Closed', threshold: '500', approved: 'yes' },
      { status: 'Open', threshold: '100', approved: 'yes' },
      { status: 'Closed', threshold: '10', approved: 'yes' },
    ]);
  });

  it('can combine cli arguments', () => {
    let result = pict(model, {
      options: { randomize_generation: 10, order_of_combinations: 1 },
    });

    assert.deepStrictEqual(result.testCases, [
      { status: 'Open', threshold: '100', approved: 'no' },
      { status: 'Closed', threshold: '10', approved: 'yes' },
      { status: 'Open', threshold: '500', approved: 'yes' },
    ]);
  });

  it('accepts case_sensitive_model_evaluation cli argument', () => {
    let result = pict(model, {
      options: { case_sensitive_model_evaluation: true },
    });

    assert.deepStrictEqual(result.testCases, [
      { status: 'Open', threshold: '100', approved: 'no' },
      { status: 'Closed', threshold: '10', approved: 'no' },
      { status: 'Closed', threshold: '500', approved: 'yes' },
      { status: 'Closed', threshold: '100', approved: 'yes' },
      { status: 'Open', threshold: '10', approved: 'yes' },
      { status: 'Open', threshold: '500', approved: 'no' },
    ]);
  });

  it('accepts show_model_statistics cli argument', () => {
    let result = pict(model, {
      options: { show_model_statistics: true },
    });

    assert.deepStrictEqual(result.statistics, {
      combinations: 16,
      generated_tests: 6,
    });
  });
});
