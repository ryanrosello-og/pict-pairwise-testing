const execSync = require('child_process').execSync;
const path = require('path');
const writeFileSync = require('fs').writeFileSync;
const existsSync = require('fs').existsSync;
const readFileSync = require('fs').readFileSync;
const snakeCase = require('lodash').snakeCase;
const isObject = require('lodash').isObject;
const isEmpty = require('lodash').isEmpty;
const temp = require('temp');

function pict(model, options = {}) {
  let textModel = '';
  const modelFilename = generateModelFilename();

  if (isObject(model)) {
    // JSON pict model supplied
    model.parameters.forEach((prop) => {
      let propertDefinition = `${prop.property}: ${prop.values.toString()}`;
      textModel = textModel + propertDefinition + '\n';
    });

    if (model.submodels && model.submodels.length > 0) {
      model.submodels.forEach((prop) => {
        textModel = textModel + prop + '\n';
      });
    }

    if (model.constraints && model.constraints.length > 0) {
      model.constraints.forEach((prop) => {
        textModel = textModel + prop + '\n';
      });
    }
  } else if (existsSync(model)) {
    // path to a static model file supplied
    textModel = readFileSync(model);
  } else {
    textModel = model;
  }

  saveModelFile(textModel, modelFilename);

  let stdOut = '';
  try {
    stdOut = execute(options, modelFilename);
  } catch (err) {
    return {
      stackTrace: err,
      command: err.message.split('\n')[0].trim(),
      error: err.message.split('\n')[1].trim(),
    };
  }

  let parsedTestCases = [];
  let parsedStats = {};
  if (
    isObject(options) &&
    !isEmpty(options) &&
    options.options.show_model_statistics
  ) {
    parsedStats = parseCmdOutputAsStats(stdOut);
  } else {
    parsedTestCases = parseCmdOutput(stdOut);
  }
  return {
    textModel: textModel,
    generatedModelFile: modelFilename,
    testCases: parsedTestCases,
    statistics: parsedStats,
  };
}

function execute(options, modelPath) {
  let testMode = true;
  try {
    require.resolve('pict-pairwise-testing/package.json');
    testMode = false;
  } catch (error) {
    testMode = true;
  }

  let cliArgs = '';
  if (isObject(options) && !isEmpty(options)) {
    cliArgs = generateCliArgs(options);
  }

  let pictBinary = '';
  let basePath = '';
  if (!testMode) {
    basePath = path.dirname(
      require.resolve('pict-pairwise-testing/package.json')
    );
    if (process.platform === 'win32') {
      pictBinary = `${basePath.replace('\\', '\\\\')}\\binaries\\pict.exe`;
    } else if (process.platform === 'darwin') {
      pictBinary = `${basePath}/binaries/pict_darwin`;
    } else {
      pictBinary = `${basePath}/binaries/pict_nix`;
    }
  } else {
    if (process.platform === 'win32') {
      pictBinary = '.\\binaries\\pict.exe';
    } else if (process.platform === 'darwin') {
      pictBinary = `./binaries/pict_darwin`;
    } else {
      pictBinary = `./binaries/pict_nix`;
    }
  }

  console.log('Executing pict', `${pictBinary} ${modelPath} ${cliArgs}`);
  return execSync(`${pictBinary} ${modelPath} ${cliArgs}`).toString();
}

function generateCliArgs(cliArgs) {
  let cli = '';
  if (cliArgs.options.order_of_combinations) {
    cli = `${cli} /o:${cliArgs.options.order_of_combinations}`;
  }

  if (cliArgs.options.randomize_generation) {
    cli = `${cli} /r:${cliArgs.options.randomize_generation}`;
  }

  if (cliArgs.options.case_sensitive_model_evaluation) {
    cli = `${cli} /c`;
  }

  if (cliArgs.options.show_model_statistics) {
    cli = `${cli} /s`;
  }

  return cli;
}

function parseCmdOutputAsStats(stdout) {
  const parsedString = stdout.split('\n');

  return {
    combinations: parseInt(parsedString[0].split(':')[1].trim()),
    generated_tests: parseInt(parsedString[1].split(':')[1].trim()),
  };
}

function parseCmdOutput(stdout) {
  const parsedString = stdout.split('\n').map((line) => line.split('\t'));
  const properties = parsedString[0].map((p) => snakeCase(p));
  let testCases = [];
  parsedString.forEach((pictTest, rowIndex) => {
    if (pictTest.length === 1 && pictTest[0] === '') return;

    if (rowIndex !== 0) {
      let testCase = {};
      pictTest.forEach((prop, colIndex) => {
        testCase[properties[colIndex]] = prop.replace(/(\r\n|\n|\r)/gm, '');
      });
      testCases.push(testCase);
    }
  });

  return testCases;
}

function saveModelFile(model, modelFilename) {
  try {
    let __dirname = path.resolve(path.dirname(''));
    let modelPath = `${path.resolve(__dirname, 'models', modelFilename)}`;
    writeFileSync(modelPath, model, function (err) {
      if (err) throw err;
      console.log(`Successfully generated model file => ${modelFilename}`);
    });

    return modelFilename;
  } catch (error) {
    throw error;
  }
}

function generateModelFilename() {
  return temp.path({ suffix: '.model' });
}

module.exports = { pict };
