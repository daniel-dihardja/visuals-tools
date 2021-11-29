import {Visual} from "../core/visual";
import {Pane} from "tweakpane";

const params = {
  iteration: 100,
  magnificationFactor: 2900,
  panX: 0.7,
  panY: 0.6
}

export class VisualMandelbrot01 extends Visual{
  constructor(settings) {
    super(settings);
    this.width = 600;
    this.height = 600;
    this.x = (settings.width - this.width) / 2;
    this.y = (settings.height - this.height) / 2;
    this.data = [];
    this.updateData();
  }

  draw(ctx) {
    ctx.save();
    ctx.clearRect(0, 0, this.width, this.height);
    for (let p of this.data) {
      ctx.fillStyle = p.c;
      ctx.fillRect(p.x, p.y, 1, 1);
    }
    ctx.restore();
  }

  checkIfBelongsToMandelbrotSet(x, y) {
    let realComponentOfResult = x;
    let imaginaryComponentOfResult = y;
    const maxIterations = params.iteration;
    for(let i = 0; i < maxIterations; i++) {
      const tempRealComponent = realComponentOfResult * realComponentOfResult
        - imaginaryComponentOfResult * imaginaryComponentOfResult
        + x;
      const tempImaginaryComponent = 2 * realComponentOfResult * imaginaryComponentOfResult
        + y;
      realComponentOfResult = tempRealComponent;
      imaginaryComponentOfResult = tempImaginaryComponent;

      // Return a number as a percentage
      if(realComponentOfResult * imaginaryComponentOfResult > 5)
        return (i/maxIterations * 100);
    }
    return 0;   // Return zero if in set
  }

  updateData() {
    this.data = [];
    for(let x=0; x < this.width; x++) {
      for(let y=0; y < this.height; y++) {
        const belongsToSet = this.checkIfBelongsToMandelbrotSet(
          x / params.magnificationFactor - params.panX,
          y / params.magnificationFactor - params.panY);

        if(belongsToSet === 0) {
          this.data.push({x, y, c: '#000'});
        } else {
          this.data.push({x, y, c: 'hsl(0, 100%, ' + belongsToSet + '%)'})
        }
      }
    }
  }

  createPane() {
    this.removeTweakPane();
    const pane = new Pane();
    let folder;
    folder = pane.addFolder({ title: 'Mandelbrot'});
    folder.addInput(params, 'iteration', { min: 10, max: 200, step: 1 });
    folder.addInput(params, 'magnificationFactor', { min: 100, max: 5000, step: 1 });
    folder.addInput(params, 'panX', { min: 0, max: 5, step: 0.1 });
    folder.addInput(params, 'panY', { min: 0, max: 5, step: 0.1 });

    pane.on('change', (evt) => {
      this.updateData();
    });
  }
}
