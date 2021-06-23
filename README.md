# 🔬 pict-pairwise-testing

![tests](https://github.com/ryanrosello-og/pict-pairwise-testing/actions/workflows/run_tests.yml/badge.svg)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ryanrosello-og/pict-pairwise-testing/blob/main/LICENSE)

A simple Nodejs wrapper for PICT, this brings the goodness of pairwise (aka all pairs) testing into the Javascript world. All models can be defined using either a simple JSON structure, inline text, or file-based models are also supported. The generated set of test cases will be in an easy to consume JSON array.

For a full overview of capabilities of PICT, visit [Microsoft's gitub repo](https://github.com/Microsoft/pict/blob/main/doc/pict.md) or [PICT's detailed documentation](https://github.com/Microsoft/pict/blob/main/doc/pict.md)

# Installing

`npm install pict-pairwise-testing`

# Basic Usage

```javascript
const pict = require('pict-pairwise-testing').pict

// model for a fictitious mortgage calculator application
const model = {
  parameters: [
    { property: 'Principal', values: [300000, 350000, 4000000] },
    { property: 'Number of years', values: [20, 21, 22, 23, 24] },
    { property: 'Repayment type', values: ['Interest only 1 year', 'Interest only 2 years'] },
    { property: 'Interest Rate', values: [1, 1, 99, 2.99, 3.5, 4] }
  ],
};

let result = pict(model);

console.log('Generated test cases', result.testCases)
```

Pict will then generate the following test cases:

```javascript
[
  {
    principal: '350000',
    number_of_years: '23',
    repayment_type: 'Interest only 1 year',
    interest_rate: '1'
  },
  {
    principal: '300000',
    number_of_years: '21',
    repayment_type: 'Interest only 2 years',
    interest_rate: '99'
  },
  {
    principal: '4000000',
    number_of_years: '21',
    repayment_type: 'Interest only 1 year',
    interest_rate: '1'
  },
  ...
  ...
  ...
  {
    principal: '4000000',
    number_of_years: '23',
    repayment_type: 'Interest only 2 years',
    interest_rate: '3.5'
  },
  {
    principal: '300000',
    number_of_years: '22',
    repayment_type: 'Interest only 2 years',
    interest_rate: '1'
  }
]
```
Inline text models are also supported, this can be achieved by defining the model as follows:

```javascript
const pict = require('pict-pairwise-testing').pict

const model = `
          Principal: 300000,350000,4000000
          Number of years: 20,21,22,23,24
          Repayment type: Interest only 1 year,Interest only 2 years
          Interest Rate: 1,1,99,2.99,3.5,4
`

let result = pict(model);

console.log('Generated test cases', result.testCases)
```

You can even use old school PICT model file by using the package like so:

*my_model.pict*
```text
Principal: 300000,350000,4000000
Number of years: 20,21,22,23,24
Repayment type: Interest only 1 year,Interest only 2 years
Interest Rate: 1,1,99,2.99,3.5,4
```

```javascript
const pict = require('pict-pairwise-testing').pict
const __dirname = path.resolve(path.dirname(''));
const modelFile = path.resolve(__dirname, 'fixtures/my_model.model');

let results = pict(modelFile);
console.log('Generated test cases', result.testCases)
```

# Supported cli parameters

The following set of command-line options are supported:
| key                             | mapped to PICT option | description                          |
|---------------------------------|-----------------------|--------------------------------------|
| order_of_combinations           | /o:N                  | - Order of combinations (default: 2) |
| randomize_generation            | /r[:N]                | - Randomize generation, N - seed     |
| case_sensitive_model_evaluation | /c                    | - Case-sensitive model evaluation    |
| show_model_statistics           | /s                    | - Show model statistics              |

CLI parameters can be invoked by passing an option object into PICT:

```javascript
const pict = require('pict-pairwise-testing').pict

const model = {
  parameters: [
    { property: 'Status', values: ['Open', 'Closed'] },
    { property: 'Threshold', values: [10, 100, 500] },
    { property: 'Approved', values: ['yes', 'no'] },
  ],
};

let result = pict(model, {
  options: { randomize_generation: 10, order_of_combinations: 1 },
});
```

The `show_model_statistics` option can be used to preview model statistics derived by PICT:

```javascript
const pict = require('pict-pairwise-testing').pict

const model = {
  parameters: [
    { property: 'Status', values: ['Open', 'Closed'] },
    { property: 'Threshold', values: [10, 100, 500] },
    { property: 'Approved', values: ['yes', 'no'] },
  ],
};

let result = pict(model, {
  options: { show_model_statistics: true }
});

console.log(result.statistics)
```

This yields
```javascript
{
  combinations: 16,
  generated_tests: 6,
}
```

# Unsupported cli parameters

- separator_for_values:  /d:C    - Separator for values  (default: ,)
- separator_for_aliases: /a:C    - Separator for aliases (default: |)
- negative_value_prefix: /n:C    - Negative value prefix (default: ~)

# Constraints example

Constraints can be defined by passing a constraints array into the model, for example:

```javascript
const pict = require('pict-pairwise-testing').pict
const modelWithConstraints = {
  parameters: [
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

let result = pict(modelWithConstraints);
```

# Sub-models

Sub-models can be defined by passing a submodels array into the model, for example:

```javascript
const pict = require('pict-pairwise-testing').pict
const modelWithSubmodel = {
  parameters: [
    { property: 'PLATFORM', values: ['x86', 'x64', 'arm'] },
    { property: 'CPUS', values: [1, 2, 4] },
    { property: 'RAM', values: ['1GB', '4GB', '64GB'] },
    { property: 'HDD', values: ['SCSI', 'IDE'] },
    { property: 'OS', values: ['Win7', 'Win8', 'Win10'] },
    { property: 'Browser', values: ['Edge', 'Opera', 'Chrome', 'Firefox'] },
    { property: 'APP', values: ['Word', 'Excel', 'Powerpoint'] },
  ],
  submodels: ['{ PLATFORM, CPUS, RAM, HDD } @ 3', '{ OS, Browser } @ 2'],
};

let result = pict(modelWithSubmodel);
```



# Credits

There is nothing special about this package. All its doing is parsing the JSON pict model into text model which PICT can understand. PICT then performs the necessary heavy lifting to generate the test cases. Under the hood, this package fully relies on the PICT executable from [Microsoft's gitub repo](https://github.com/Microsoft/pict/blob/main/doc/pict.md)

# License

[MIT][mit]
