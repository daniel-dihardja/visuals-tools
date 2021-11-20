/**
 * interface for the visuals
 */
export class Visual {
  constructor() {
    this._ctrlKeyDown = false;
  }
  set ctrlKeyDown(val) {
    this._ctrlKeyDown = val;
  }
  mouseDown(evt) {}
  mouseUp(evt) {}
  mouseMove(evt) {}
  mouseClick(evt) {}
  keyPress(evt) {}
  draw(ctx, width, height, frame) {}
  createPane() {}
}
