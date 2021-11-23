import {mapRange, noise3D} from "../utils";

export class NoiseGrid {
  constructor(settings) {
    this.width = settings.width;
    this.height = settings.height;

    this.cols = 60;
    this.rows = 40;

    this.numCells = this.cols * this.rows;

    this.gridw = this.width * 1;
    this.gridh = this.height * 1;

    this.cellw = this.gridw / this.cols;
    this.cellh = this.gridh / this.rows;

    this.margx = (this.width  - this.gridw) * 0.5;
    this.margy = (this.height - this.gridh) * 0.5;
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
      n = noise3D(x, y, frameCount, 0.01, 0.4);
      angle = n * Math.PI * params.amp * 0.001;

      const scale = mapRange(n, -1, 1, 1, 5);

      ctx.save();
      ctx.translate(x, y);
      ctx.translate(this.margx, this.margy);
      ctx.translate(this.cellw * 0.5, this.cellh * 0.5
      );
      ctx.rotate(angle);

      ctx.lineWidth = scale;
      ctx.lineCap = params.lineCap;

      ctx.strokeStyle = 'white';
      ctx.beginPath();
      ctx.moveTo(w * -0.5, 0);
      ctx.lineTo(w *  0.5, 0);
      ctx.stroke();

      ctx.restore();
    }
  }
}
