import {Visual} from '../visual';
import {Pane} from "tweakpane";
import {noise2D} from "../utils";

const params = {
  awidth: 200,
  aheight: 100
};

class Agent {
  render(ctx, data) {
    ctx.save();
    ctx.translate(data.x, data.y);
    ctx.rotate(data.angle);
    ctx.fillRect(0, 0, data.w, data.h);

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, data.n * 50, 10);

    ctx.restore();
  }
}

export class Visual02 extends Visual{

  constructor(settings) {
    super(settings);
    this.listSize = 60;
    this.data = new Array(this.listSize).fill(({
      x: 0,
      y: 0,
      w: 10,
      h: 0,
      angle: 0,
    }));

    this.agents = new Array(this.listSize).fill(new Agent());
    this.isMouseDown = false;
  }

  draw(ctx) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.fillStyle = 'white';
    for (let i=0; i < this.listSize; i++) {
      const data = this.data[i];
      this.agents[i].render(ctx, data);
    }
  }

  mouseDown(evt) {
    this.isMouseDown = true;
  }

  mouseUp(evt) {
    this.isMouseDown = false;
  }

  mouseMove(evt) {
    if (! this.isMouseDown) return;
    const index = this.frameCount % this.listSize;
    const n = noise2D(evt.offsetX, evt.offsetY, 0.005, 0.5)
    this.data[index] = {
      x: evt.offsetX,
      y: evt.offsetY,
      w: n * params.awidth,
      h: n * params.aheight,
      angle: n * Math.PI * 0.5,
      n: n
    }
  }

  createPane() {
    this.removeTweakPane();
    const pane = new Pane();
    let folder;
    folder = pane.addFolder({ title: 'List '});
    folder.addInput(params, 'awidth', { min: 20, max: 400, step: 1 });
    folder.addInput(params, 'aheight', { min: 20, max: 400, step: 1 });
  }
}
