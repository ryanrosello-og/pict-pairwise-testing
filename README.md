[] bubble up errors from 
[] use fixtures for all spec files
[] validated params
[] readme with examples
[] cypress example
[] if arch type === windows 

# pict-pairwise-testing

A simple nodejs wrapper for PICT, this brings the goodness of pairwise (aka all pairs) testing into the Javascript world.  All models can be defined using simple JSON structure negating the need to define models as plain text.

For a full overview of capabilities of PICT, visit <link>

# Installing

`npm install ....

# Basic Usage


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

There is nothing special about this package.  All its doing is parsing the JSON pict model into text model which PICT can understand. PICT then performs the necessary heavy lifting to generate the test cases.  Under the hood, this package fully relies on the PICT executable from <link>
  
# License