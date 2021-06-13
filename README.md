# 🔬 pict-pairwise-testing

![tests](https://github.com/ryanrosello-og/pict-pairwise-testing/actions/workflows/run_tests.yml/badge.svg)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ryanrosello-og/pict-pairwise-testing/blob/main/LICENSE)

A simple Nodejs wrapper for PICT, this brings the goodness of pairwise (aka all pairs) testing into the Javascript world.  All models can be defined using either a simple JSON structure or inline text, file-based models are also supported.  The generated set of test cases will be in an easy to consume JSON array.

For a full overview of capabilities of PICT, visit [Microsoft's gitub repo](https://github.com/Microsoft/pict/blob/main/doc/pict.md) or [PICT's detailed documentation](https://github.com/Microsoft/pict/blob/main/doc/pict.md)

# Installing

`npm install pict-pairwise-testing`

# Basic Usage

```javascript


```

# Constraints example


# Sub-models




# Supported cli parameters
*

Example Usage:



# Unsupported cli parameters

* separator_for_values
* separator_for_aliases
* negative_value_prefix

# Credits

There is nothing special about this package.  All its doing is parsing the JSON pict model into text model which PICT can understand. PICT then performs the necessary heavy lifting to generate the test cases.  Under the hood, this package fully relies on the PICT executable from [Microsoft's gitub repo](https://github.com/Microsoft/pict/blob/main/doc/pict.md)
  
# License

[MIT][mit]