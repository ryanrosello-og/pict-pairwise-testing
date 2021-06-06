import { exec } from 'child_process';
import path from 'path';
import { writeFileSync } from 'fs';
import pkg from 'lodash';
const { snakeCase } = pkg;
export default class Pict {
  constructor(model) {
    this.pict = model;
    this.pictResult = '';
    this.testCases = [];
    this.generatedModelFile = `${new Date()
      .toISOString()
      .replace(/z|:/gi, '')}_generated.model`;
  }

  generateModel() {
    let textModel = '';
    this.pict.parameters.forEach((prop, idx, array) => {
      let propertDefinition = `${prop.property}: ${prop.values.toString()}`;
      if (idx === array.length - 1) {
        textModel = textModel + propertDefinition;
      } else {
        textModel = textModel + propertDefinition + '\n';
      }
    });
    this.saveModelFile(textModel, this.generatedModelFile);
    this.execute();

    return {
      textModel: textModel,
      generatedModelFile: this.generatedModelFile,
      testCases: this.testCases,
    };
  }

  execute() {
    const __dirname = path.resolve(path.dirname(''));
    const modelPath = `${path.resolve(
      __dirname,
      'models',
      this.generatedModelFile
    )}`;

    console.log('Executing pict', `./binaries/pict_nix ${modelPath}`);
    exec(`./binaries/pict_nix ${modelPath}`, (error, stdout, stderr) => {
      if (error !== null) {
        throw error;
      }
      this.pictResult = stdout;
      const parsedString = this.pictResult
        .split('\n')
        .map((line) => line.split('\t'));
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
      this.testCases = testCases;
      console.log('pict result \n', parsedString);
      console.log('JSON \n', testCases);
    });
  }

  saveModelFile(model, pathToModel) {
    try {
      writeFileSync(`./models/${pathToModel}`, model, function (err) {
        if (err) throw err;
        console.log(`Successfully generated model file => ${pathToModel}`);
      });

      return pathToModel
    } catch (error) {
      throw error;
    }
  }
}
