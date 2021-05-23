import { exec } from 'child_process';
import { writeFile } from 'fs';
export default class Pict {
  constructor(model) {
    this.pict = model;
  }

  getModel() {
    let textModel = '';
    this.pict.parameters.forEach((prop) => {
      textModel =
        textModel + '\n' + `${prop.property}: ${prop.values.toString()}`;
    });
    console.log(textModel);
    return textModel;
  }

  execute() {
    exec('./binaries/pict_nix ./models/test.model', (error, stdout, stderr) => {
      console.log('stdout:', stdout);
      console.log('stderr:', stderr);
      if (error !== null) {
        console.log('exec error:', error);
      }
    });
  }

  getSaveModelFile() {
    writeFile('./models/helloworld.model', this.getModel(), function (err) {
      if (err) return console.log(err);
      console.log('Hello World > helloworld.txt');
    });
    return this.pict;
  }
}
