import {noise3D, mapRange} from "../utils/index";
import {Visual} from '../visual';
import {Pane} from "tweakpane";

const params = {
  cols: 10,
  rows: 10,
  scaleMin: 1,
  scaleMax: 30,
  freq: 0.001,
  amp: 0.2,
  speed: 3,
  lineCap: 'butt',
  useMidi: true,
  scenes: '0'
};

export class Visual01 extends Visual{

  constructor(settings) {
    super(settings);
    this.getScenes('visuals-01')
  }

  draw(ctx) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0, this.width, this.height);

    let cols, rows;
    cols = params.cols;
    rows = params.rows;

    const numCells = cols * rows;

    const gridw = this.width  * 0.8;
    const gridh = this.height * 0.8;
    const cellw = gridw / cols;
    const cellh = gridh / rows;
    const margx = (this.width  - gridw) * 0.5;
    const margy = (this.height - gridh) * 0.5;

    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cellw;
      const y = row * cellh;
      const w = cellw * 0.8;
      const h = cellh * 0.8;


      let n, angle;
      n = noise3D(x, y, this.frameCount * params.speed, params.freq);
      angle = n * Math.PI * params.amp;

      // const scale = (n + 1) / 2 * 30;
      // const scale = (n * 0.5 + 0.5) * 30;

      const scale = mapRange(n, -1, 1, params.scaleMin, params.scaleMax);

      ctx.save();
      ctx.translate(x, y);
      ctx.translate(margx, margy);
      ctx.translate(cellw * 0.5, cellh * 0.5);
      ctx.rotate(angle);

      ctx.lineWidth = scale;
      ctx.lineCap = params.lineCap;

      ctx.strokeStyle = 'red';
      ctx.beginPath();
      ctx.moveTo(w * -0.5, 0);
      ctx.lineTo(w *  0.5, 0);
      ctx.stroke();

      ctx.restore();
    }
  }

  createPane() {
    this.removeTweakPane();
    const pane = new Pane();
    let folder;
    folder = pane.addFolder({ title: 'Grid '});
    folder.addInput(params, 'lineCap', { options: { butt: 'butt', round: 'round', square: 'square' }});
    folder.addInput(params, 'cols', { min: 2, max: 50, step: 1 });
    folder.addInput(params, 'rows', { min: 2, max: 50, step: 1 });
    folder.addInput(params, 'scaleMin', { min: 1, max: 100 });
    folder.addInput(params, 'scaleMax', { min: 1, max: 100 });

    folder = pane.addFolder({ title: 'Noise' });
    folder.addInput(params, 'freq', { min: -0.01, max: 0.01 });
    folder.addInput(params, 'amp', { min: 0, max: 1 });
    folder.addInput(params, 'speed', { min: 1, max: 10 });
    folder.addInput(params, 'useMidi');
  }

  ctrlAndKeyPress(evt) {
    this.scenes[evt.key] = {... params};
    this.storeScenes('visuals-01');
  }

  keyPress(evt) {
    const newParams = this.scenes[evt.key];
    if (newParams) {
      this.setParams(params, newParams);
      this.createPane();
    }
  }
}
