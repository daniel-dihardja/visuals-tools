import {noise3D, mapRange} from "../utils/index";
import {Visual} from '../visual';
import {Pane} from "tweakpane";

let params = {
  cols: 10,
  rows: 10,
  scaleMin: 1,
  scaleMax: 30,
  freq: 0.001,
  amp: 0.2,
  speed: 5,
  lineCap: 'butt',
  useMidi: true,
  paramsCollection: '0'
};

const paramsCollection = JSON.parse(window.localStorage.getItem('params')) || [];

export class Visual01 extends Visual{

  draw(ctx, width, height, frame) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0, width, height);

    let cols, rows;
    cols = params.cols;
    rows = params.rows;

    const numCells = cols * rows;

    const gridw = width  * 0.8;
    const gridh = height * 0.8;
    const cellw = gridw / cols;
    const cellh = gridh / rows;
    const margx = (width  - gridw) * 0.5;
    const margy = (height - gridh) * 0.5;

    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cellw;
      const y = row * cellh;
      const w = cellw * 0.8;
      const h = cellh * 0.8;

      let n, angle;
      n = noise3D(x, y, frame * params.speed, params.freq);
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
    const tp = document.querySelector('.tp-dfwv')
    if (tp) {
      tp.parentNode.removeChild(tp);
    }
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
    folder.addInput(params, 'speed', { min: 5, max: 10 });
    folder.addInput(params, 'useMidi');
    folder.addInput(params, 'paramsCollection', this.getParamsOptions()).on('change', ev => {
      Object.keys(params).forEach(key => {
        params[key] = ev.value[key];
      });
    });
  }

  getParamsOptions() {
    const o = {};
    paramsCollection.forEach((e, i) => {
      o[i] = e;
    });
    return {options: o};
  }

  keyPress(evt) {
    if (evt.key === 's') {
      paramsCollection.push(params);
      window.localStorage.setItem('params', JSON.stringify(paramsCollection));
    }
  }
}
