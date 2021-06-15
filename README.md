# Fix

```
 20:08:18  ✘  ry@ry-Alpha-X-NH58DD  ~/_tmp/test-pairwise  ⬡ v14.17.0 
$ npm test

> test-pairwise@1.0.0 test /home/ry/_tmp/test-pairwise
> node ./index.js

/home/ry/_tmp/test-pairwise/node_modules/pict-pairwise-testing/lib/pict.js:150
    throw error;
    ^

Error: ENOENT: no such file or directory, open './models/2021-06-15T100853.059_generated.model'
    at Object.openSync (fs.js:498:3)
    at writeFileSync (fs.js:1524:35)
    at saveModelFile (/home/ry/_tmp/test-pairwise/node_modules/pict-pairwise-testing/lib/pict.js:143:5)
    at pict (/home/ry/_tmp/test-pairwise/node_modules/pict-pairwise-testing/lib/pict.js:39:3)
    at Object.<anonymous> (/home/ry/_tmp/test-pairwise/index.js:12:15)
    at Module._compile (internal/modules/cjs/loader.js:1068:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1097:10)
    at Module.load (internal/modules/cjs/loader.js:933:32)
    at Function.Module._load (internal/modules/cjs/loader.js:774:14)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:72:12) {
  errno: -2,
  syscall: 'open',
  code: 'ENOENT',
  path: './models/2021-06-15T100853.059_generated.model'
}
npm ERR! Test failed.  See above for more details.
```

# 🔬 pict-pairwise-testing

![tests](https://github.com/ryanrosello-og/pict-pairwise-testing/actions/workflows/run_tests.yml/badge.svg)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ryanrosello-og/pict-pairwise-testing/blob/main/LICENSE)

A simple Nodejs wrapper for PICT, this brings the goodness of pairwise (aka all pairs) testing into the Javascript world. All models can be defined using either a simple JSON structure or inline text, file-based models are also supported. The generated set of test cases will be in an easy to consume JSON array.

For a full overview of capabilities of PICT, visit [Microsoft's gitub repo](https://github.com/Microsoft/pict/blob/main/doc/pict.md) or [PICT's detailed documentation](https://github.com/Microsoft/pict/blob/main/doc/pict.md)

# Installing

`npm install pict-pairwise-testing`

# Basic Usage

```javascript

```

# Constraints example

# Sub-models

# Supported cli parameters

-

Example Usage:

# Unsupported cli parameters

- separator_for_values
- separator_for_aliases
- negative_value_prefix

# Credits

There is nothing special about this package. All its doing is parsing the JSON pict model into text model which PICT can understand. PICT then performs the necessary heavy lifting to generate the test cases. Under the hood, this package fully relies on the PICT executable from [Microsoft's gitub repo](https://github.com/Microsoft/pict/blob/main/doc/pict.md)

# License

[MIT][mit]
