import { execSync } from 'child_process';
import path from 'path';
import { writeFileSync } from 'fs';
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
    this.saveModelFile(textModel, this.generatedModelFile);
    const stdOut = this.execute();
    const t = this.parseCmdOutput(stdOut);
    return {
      textModel: textModel,
      generatedModelFile: this.generatedModelFile,
      testCases: t,
    };
  }

  execute() {
    const __dirname = path.resolve(path.dirname(''));
    const modelPath = `${path.resolve(
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
    return execSync(`./binaries/pict_nix ${modelPath} ${cliArgs}`).toString();
  }

  generateCliArgs() {
    let cli = '';

    // TODO:this.pictOptions is an array, need to figure out if prop exists
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
    console.log('pict result \n', parsedString);
    console.log('JSON \n', testCases);
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
