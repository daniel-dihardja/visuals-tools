/**
 * interface for the visuals
 */
export class Visual {
  mouseDown(evt) {}
  mouseUp(evt) {}
  mouseMove(evt) {}
  mouseClick(evt) {}
  keyPress(evt) {}
  draw(ctx, width, height, frame) {}
  createPane(pane) {}
}
