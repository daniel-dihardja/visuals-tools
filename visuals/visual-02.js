import {Visual} from '../visual';
import {Pane} from "tweakpane";
import {noise2D} from "../utils";

const params = {
  cols: 10,
  rows: 10,
};

export class Visual02 extends Visual{

  constructor(settings) {
    super(settings);
    this.data = new Array(60).fill({
      x: 0,
      y: 0,
      w: 10,
      h: 0,
      angle: 0,
    });
    this.isMouseDown = false;
  }

  draw(ctx) {
    // console.log(this.frameCount);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, this.width, this.height);

    const index = this.frameCount % 60;
    ctx.fillStyle = 'white';
    for (let e of this.data) {
      ctx.save();
      ctx.translate(e.x, e.y);
      ctx.rotate(e.angle);
      ctx.fillRect(0, 0, e.w, e.h);
      ctx.restore();
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
    const index = this.frameCount % 60;
    const n = noise2D(evt.offsetX, evt.offsetY, 0.005, 0.5)
    this.data[index] = {
      x: evt.offsetX,
      y: evt.offsetY,
      w: n * 200,
      h: n * 100,
      angle: n * Math.PI * 0.5,
    }
  }

  createPane() {
    this.removeTweakPane();
    const pane = new Pane();
    let folder;
    folder = pane.addFolder({ title: 'Grid '});
    folder.addInput(params, 'cols', { min: 2, max: 50, step: 1 });
    folder.addInput(params, 'rows', { min: 2, max: 50, step: 1 });
  }
}
