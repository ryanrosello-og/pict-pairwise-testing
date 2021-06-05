import { exec } from 'child_process';
import { writeFile } from 'fs';
export default class Pict {
  constructor(model) {
    this.pict = model;
  }

  generateModel() {
    let textModel = '';
    this.pict.parameters.forEach((prop) => {
      textModel =
        textModel + '\n' + `${prop.property}: ${prop.values.toString()}`;
    });
    console.log(textModel);

    this.saveModelFile(textModel);
    return textModel;
  }

  parseStdOutput() {}

  execute() {
    exec('./binaries/pict_nix ./models/test.model', (error, stdout, stderr) => {
      console.log('stdout:', stdout);
      console.log('stderr:', stderr);
      if (error !== null) {
        console.log('exec error:', error);
      }
    });
  }

  saveModelFile(model) {
    const generatedModelFile = `./models/${new Date()
      .toISOString()
      .replace(/z|:/gi, '')}_generated.model`;

    try {
      writeFile(generatedModelFile, model, function (err) {
        if (err) throw err;
      });
      console.log(`Successfully generated model file => ${generatedModelFile}`);
      return generatedModelFile;
    } catch (error) {
      throw error;
    }
  }
}
