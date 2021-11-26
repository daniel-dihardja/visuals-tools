import {mapRange, noise3D} from "../utils";

export class StarsBackground {
  constructor(settings) {
    this.width = settings.width;
    this.height = settings.height;
    this.cols = 50;
    this.rows = 50;
    this.cellw = this.width / this.cols;
    this.cellh = this.height / this.rows;
    this.numCells = this.cols * this.rows;
  }

  render(ctx, frameCount, params) {
    for (let i = 0; i < this.numCells; i++) {
      const col = i % this.cols;
      const row = Math.floor(i / this.cols);

      const x = col * this.cellw;
      const y = row * this.cellh;
      const w = this.cellw * 0.8;
      const h = this.cellh * 0.8;

      let n, angle;
      const f = params.freq || 0.05;
      n = noise3D(x, y, frameCount, f, 0.1);
      const o = params.offset || 0.05;
      if (n < o) continue;
      angle = n * Math.PI * params.amp * 0.001;

      const scale = mapRange(n, -1, 1, 1, 5);

      ctx.save();
      ctx.translate(x, y);
      ctx.translate(this.cellw * 0.5, this.cellh * 0.5);
      ctx.lineWidth = scale;
      ctx.fillStyle = '#00FF00';
      ctx.strokeStyle = '#00FF00';
      //ctx.rotate(angle);
      ctx.beginPath();
      const nn = w * n * 5;
      ctx.moveTo(nn * -0.5, 0);
      ctx.lineTo(nn *  0.5, 0);
      ctx.stroke();
      // ctx.fillRect(x, y, w, h);
      ctx.restore();
    }
  }
}
