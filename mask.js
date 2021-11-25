export class Mask {

  constructor(settings) {
    this.x = 10;
    this.y = 10;
    this.width = 100;
    this.height = 100;
    this.drag = false;
  }

  mouseDown(evt) {
    this.drag = true;
  }

  mouseUp(evt) {
    this.drag = false;
  }

  mouseMove(evt) {

  }

  render(ctx) {

  }
}
