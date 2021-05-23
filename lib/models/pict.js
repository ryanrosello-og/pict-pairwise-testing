import { exec } from 'child_process';
export default class Pict {
  constructor(model) {
    this.pict = model;
  }

  getModel() {
    return this.pict.parameters.forEach((prop) =>
      console.log(`${prop.property}: ${prop.values.toString()}`)
    );
  }

  execute() {
    exec.child = exec('../../binaries/pict_nix', (error, stdout, stderr) => {
      console.log('stdout:', stdout);
      console.log('stderr:', stderr);
      if (error !== null) {
        console.log('exec error:', error);
      }
    });
  }

  getSaveModelFile() {
    return this.pict;
  }
}
