import { exec } from 'child_process';
import path from 'path';
import { writeFile } from 'fs';
export default class Pict {
  constructor(model) {
    this.pict = model;
    this.pictResult = '';
    this.generatedModelFile = `${new Date()
      .toISOString()
      .replace(/z|:/gi, '')}_generated.model`;
  }

  generateModel() {
    let textModel = '';
    this.pict.parameters.forEach((prop) => {
      textModel =
        textModel + `${prop.property}: ${prop.values.toString()}` + '\n';
    });
    this.saveModelFile(textModel, this.generatedModelFile).then((r) => {
      this.execute();
    });

    return {
      textModel: textModel,
      generatedModelFile: this.generatedModelFile,
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
      console.log('pict result \n', parsedString);
    });
  }

  saveModelFile(model, pathToModel) {
    return new Promise((resolve, reject) => {
      console.log('Initial');
      try {
        writeFile(`./models/${pathToModel}`, model, function (err) {
          if (err) throw err;
          console.log(`Successfully generated model file => ${pathToModel}`);
          resolve(pathToModel);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}
