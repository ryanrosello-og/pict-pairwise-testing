const path = require('path');
const readFileSync = require('fs').readFileSync;

function fetchExpectedData(fixture) {
  const __dirname = path.resolve(path.dirname(''));

  const jsonString = readFileSync(
    path.resolve(__dirname, `fixtures/${fixture}.json`)
  );
  return JSON.parse(jsonString);
}
module.exports = { fetchExpectedData };
