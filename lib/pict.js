import { execSync } from 'child_process';
import path from 'path';
import { writeFileSync, existsSync, readFileSync } from 'fs';
import pkg from 'lodash';
const { snakeCase, isObject } = pkg;
export default class Pict {
  constructor(model, pictOptions = {}) {
    this.pict = model;
    this.pictOptions = pictOptions;
    this.generatedModelFile = `${new Date()
      .toISOString()
      .replace(/z|:/gi, '')}_generated.model`;
  }

  generateTestCases() {
    let textModel = '';

    if (isObject(this.pict)) {
      // JSON pict model supplied
      this.pict.parameters.forEach((prop) => {
        let propertDefinition = `${prop.property}: ${prop.values.toString()}`;
        textModel = textModel + propertDefinition + '\n';
      });

      if (this.pict.submodels && this.pict.submodels.length > 0) {
        this.pict.submodels.forEach((prop) => {
          textModel = textModel + prop + '\n';
        });
      }

      if (this.pict.constraints && this.pict.constraints.length > 0) {
        this.pict.constraints.forEach((prop) => {
          textModel = textModel + prop + '\n';
        });
      }
    } else if (existsSync(this.pict)) {
      // path to a static model file supplied
      textModel = readFileSync(this.pict);
    } else {
      textModel = this.pict;
    }

    this.saveModelFile(textModel, this.generatedModelFile);

    let stdOut = '';
    try {
      stdOut = this.execute();
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
      this.pictOptions.options &&
      this.pictOptions.options.show_model_statistics
    ) {
      parsedStats = this.parseCmdOutputAsStats(stdOut);
    } else {
      parsedTestCases = this.parseCmdOutput(stdOut);
    }
    return {
      textModel: textModel,
      generatedModelFile: this.generatedModelFile,
      testCases: parsedTestCases,
      statistics: parsedStats,
    };
  }

  execute() {
    let __dirname = path.resolve(path.dirname(''));
    let modelPath = `${path.resolve(
      __dirname,
      'models',
      this.generatedModelFile
    )}`;

    let cliArgs = '';
    if (isObject(this.pictOptions.options)) {
      cliArgs = this.generateCliArgs();
    }
    console.log(
      'Executing pict',
      `./binaries/pict_nix ${modelPath} ${cliArgs}`
    );

    let pictBinary = '';
    if (process.platform === 'win32') {
      pictBinary = './binaries/pict.exe';
    } else {
      pictBinary = './binaries/pict_nix';
    }
    return execSync(`${pictBinary} ${modelPath} ${cliArgs}`).toString();
  }

  generateCliArgs() {
    let cli = '';
    if (this.pictOptions.options.order_of_combinations) {
      cli = `${cli} /o:${this.pictOptions.options.order_of_combinations}`;
    }

    if (this.pictOptions.options.randomize_generation) {
      cli = `${cli} /r:${this.pictOptions.options.randomize_generation}`;
    }

    if (this.pictOptions.options.case_sensitive_model_evaluation) {
      cli = `${cli} /c`;
    }

    if (this.pictOptions.options.show_model_statistics) {
      cli = `${cli} /s`;
    }

    return cli;
  }

  parseCmdOutputAsStats(stdout) {
    const parsedString = stdout.split('\n');

    return {
      combinations: parseInt(parsedString[0].split(':')[1].trim()),
      generated_tests: parseInt(parsedString[1].split(':')[1].trim()),
    };
  }

  parseCmdOutput(stdout) {
    const parsedString = stdout.split('\n').map((line) => line.split('\t'));
    const properties = parsedString[0].map((p) => snakeCase(p));
    let testCases = [];
    parsedString.forEach((pictTest, rowIndex) => {
      if (pictTest.length === 1 && pictTest[0] === '') return;

      if (rowIndex !== 0) {
        let testCase = {};
        pictTest.forEach((prop, colIndex) => {
          testCase[properties[colIndex]] = prop;
        });
        testCases.push(testCase);
      }
    });

    return testCases;
  }

  saveModelFile(model, pathToModel) {
    try {
      writeFileSync(`./models/${pathToModel}`, model, function (err) {
        if (err) throw err;
        console.log(`Successfully generated model file => ${pathToModel}`);
      });

      return pathToModel;
    } catch (error) {
      throw error;
    }
  }
}
