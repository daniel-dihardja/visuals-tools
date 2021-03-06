import {Visual} from '../core/visual';
import {Pane} from "tweakpane";
import {noise2D, noise1D} from "../utils";
import {NoiseGrid} from "../lib/noise-grid";
import {StarsBackground} from "../lib/stars-background";

const params = {
  cols: 200,
  amp: 25,
  height: 100,
  offset: 0.01,
  freq: 0.003
};

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


    this.isMouseDown = false;
    this.noiseGrid = new NoiseGrid(settings);
    this.starBg = new StarsBackground(settings);
    this.getScenes('visuals-02')
  }

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.restore();

    // this.noiseGrid.render(ctx, this.frameCount, params);
    this.starBg.render(ctx, this.frameCount, params);

    ctx.fillStyle = 'white';
    const gridw = this.width * 1;
    const cellw = gridw / params.cols;
    const margx = (this.width  - gridw);
    // const margy = (this.height - gridh) * 0.5;

    // for (let i=0; i < params.cols; i++) {
    //   this.drawGrid(ctx);
    //   const x = i * cellw;
    //   const n = noise2D(x, this.frameCount, 0.005, 0.5);
    //   ctx.save();
    //   ctx.translate(margx + x, this.height);
    //   ctx.fillStyle = 'green'
    //   ctx.fillRect(0, 0, cellw * 1, (n * params.amp) - params.height );
    //   ctx.restore();
    //
    //   const n2 = noise2D(x, this.frameCount, 0.01, -0.3)
    //   ctx.save();
    //   ctx.translate(margx + x, this.height);
    //   ctx.fillStyle = 'white';
    //   ctx.fillRect(0,0, cellw * 1, (n2 * params.amp) - (params.height / 1.5));
    //   ctx.restore();
    // }
  }

  drawGrid(ctx) {

  }

  mouseDown(evt) {
    this.isMouseDown = true;
  }

  mouseUp(evt) {
    this.isMouseDown = false;
  }

  createPane() {
    this.removeTweakPane();
    const pane = new Pane();
    let folder;
    folder = pane.addFolder({ title: 'Layer 1 '});
    folder.addInput(params, 'amp', { min: 1, max: 150, step: 1 });
    folder.addInput(params, 'offset', { min: -0.1, max: 0.1, step: 0.001 });
    folder.addInput(params, 'freq', { min: -0.05, max: 0.05, step: 0.0001 });
  }

  ctrlAndKeyPress(evt) {
    this.scenes[evt.key] = {... params};
    this.storeScenes('visuals-02');
  }

  keyPress(evt) {
    const newParams = this.scenes[evt.key];
    if (newParams) {
      this.setParams(params, newParams);
    }
  }
}
