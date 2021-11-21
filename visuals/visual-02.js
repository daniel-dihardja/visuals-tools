import {Visual} from '../visual';
import {Pane} from "tweakpane";
import {noise2D, noise1D} from "../utils";


const params = {
  cols: 10,
  height: 100,
  hoffset: 0,
};

class Agent {
  render(ctx, data) {
    ctx.save();
    ctx.translate(data.x, data.y);
    ctx.rotate(data.angle * params.amp);
    ctx.fillRect(0, 0, data.w, data.h);

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, data.n * 50, 10);

    ctx.restore();
  }
}

export class Visual02 extends Visual{

  constructor(settings) {
    super(settings);
    this.listSize = 360;
    this.data = new Array(this.listSize).fill(({
      x: 0,
      y: 0,
      w: 10,
      h: 10,
      angle: 0,
    }));

    this.agents = new Array(this.listSize).fill(new Agent());
    this.isMouseDown = false;
  }

  draw(ctx) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.fillStyle = 'white';

    const gridw = this.width * 1;
    const cellw = gridw / params.cols;
    const margx = (this.width  - gridw);
    // const margy = (this.height - gridh) * 0.5;

    for (let i=0; i < params.cols; i++) {
      const x = i * cellw;
      const n = noise2D(x, this.frameCount, 0.01, 0.5);
      ctx.save();
      ctx.translate(margx + x, this.height);
      ctx.fillRect(0, 0, cellw * 0.8, (n * params.height) - params.hoffset );
      ctx.restore();
    }
  }

  mouseDown(evt) {
    this.isMouseDown = true;
  }

  mouseUp(evt) {
    this.isMouseDown = false;
  }

  mouseClick(evt) {

  }

  createPane() {
    this.removeTweakPane();
    const pane = new Pane();
    let folder;
    folder = pane.addFolder({ title: 'Grid '});
    folder.addInput(params, 'cols', { min: 2, max: 100, step: 1 });
    folder.addInput(params, 'height', { min: 2, max: 500, step: 1 });
    folder.addInput(params, 'hoffset', { min: 0, max: 200, step: 1 });
  }
}
