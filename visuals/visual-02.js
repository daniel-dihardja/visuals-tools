import {Visual} from '../visual';
import {Pane} from "tweakpane";

const params = {
  cols: 10,
  rows: 10,
};

export class Visual02 extends Visual{

  draw(ctx, width, height, frame) {
    ctx.fillStyle = 'blue';
    ctx.fillRect(0,0, width, height);
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
