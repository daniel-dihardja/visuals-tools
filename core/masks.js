class Box {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 10;
    this.drag = false;
    this.offsetX = 0;
    this.offsetY = 0;
  }

  set X(val) {
    this.x = val;
  }

  get X() {
    return this.x;
  }

  set Y(val) {
    this.y = val;
  }

  get Y() {
    return this.y;
  }

  get W() {
    return this.width;
  }

  get H() {
    return this.height;
  }

  mouseDown(evt) {
    if (this.isOver(evt.x, evt.y)) {
      this.drag = true;
      this.offsetX = evt.x - this.x;
      this.offsetY = evt.y - this.y;
    }
  }

  mouseUp(evt) {
    this.drag = false;
  }

  mouseMove(evt) {
    if (this.drag) {
      this.x = evt.x - this.offsetX;
      this.y = evt.y - this.offsetY;
    }
  }

  isOver(x, y) {
    return x >= this.x &&
      x <= this.x + this.width &&
      y >= this.y &&
      y <= this.y + this.height;
  }

  render(ctx) {
    ctx.save();
    ctx.fillStyle = 'red';
    ctx.translate(this.x, this.y);
    ctx.fillRect(0,0,this.width, this.height);
    ctx.restore();
  }
}


class Mask {
  constructor() {
    this.x = 10;
    this.y = 10;
    this.width = 100;
    this.height = 100;
    this.isSelected = false;
    this.drag = false;
    this.offsetX = 0;
    this.offsetY = 0;

    this.d1 = new Box(this.x -10, this.y - 10);
    this.d2 = new Box(this.x + this.width, this.y - 10);
    this.d3 = new Box(this.x + this.width, this.y +this.height);
    this.d4 = new Box(this.x - 10, this.y + this.height);

    this.diffD1X = 0;
    this.diffD1Y = 0;
    this.diffD2X = 0;
    this.diffD2Y = 0;
    this.diffD3X = 0;
    this.diffD3Y = 0;
    this.diffD4X = 0;
    this.diffD4Y = 0;

  }

  set selected(value) {
    this.isSelected = value;
  }

  get selected() {
    return this.isSelected;
  }

  render(ctx, editMode) {
    this.renderShape(ctx, editMode);
    if (editMode) {
      this.renderTransformBox(ctx);
    }
  }

  renderShape(ctx, editMode) {
    ctx.save();
    if (editMode) {
      ctx.fillStyle = 'yellow';
    } else {
      ctx.fillStyle = 'black';
    }
    ctx.beginPath();
    ctx.moveTo(this.d1.X + this.d1.W, this.d1.Y + this.d1.H);
    ctx.lineTo(this.d2.X, this.d2.Y + this.d2.H);
    ctx.lineTo(this.d3.X, this.d3.Y);
    ctx.lineTo(this.d4.X + this.d4.W, this.d4.Y);
    ctx.lineTo(this.d1.X + this.d1.W, this.d1.Y + this.d1.H);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  renderTransformBox(ctx) {
    this.d1.render(ctx);
    this.d2.render(ctx);
    this.d3.render(ctx);
    this.d4.render(ctx);
  }

  mouseDown(evt) {
    if (this.isOver(evt.x, evt.y)) {
      this.drag = true;
      this.isSelected = true;
      this.offsetX = evt.x - this.x;
      this.offsetY = evt.y - this.y;

      this.diffD1X = this.d1.X - this.x;
      this.diffD1Y = this.d1.Y - this.y;

      this.diffD2X = this.d2.X - this.x;
      this.diffD2Y = this.d2.Y - this.y;

      this.diffD3X = this.d3.X - this.x;
      this.diffD3Y = this.d3.Y - this.y;

      this.diffD4X = this.d4.X - this.x;
      this.diffD4Y = this.d4.Y - this.y;
    }
    this.d1.mouseDown(evt);
    this.d2.mouseDown(evt);
    this.d3.mouseDown(evt);
    this.d4.mouseDown(evt);
  }

  mouseUp(evt) {
    this.drag = false;
    this.dragDiffX = 0;
    this.d1.mouseUp(evt);
    this.d2.mouseUp(evt);
    this.d3.mouseUp(evt);
    this.d4.mouseUp(evt);
  }

  mouseMove(evt) {
    if (this.drag) {
      this.x = evt.x - this.offsetX;
      this.y = evt.y - this.offsetY;
      this.d1.X = this.x + this.diffD1X;
      this.d1.Y = this.y + this.diffD1Y;

      this.d2.X = this.x + this.diffD2X;
      this.d2.Y = this.y + this.diffD2Y;

      this.d3.X = this.x + this.diffD3X;
      this.d3.Y = this.y + this.diffD3Y;

      this.d4.X = this.x + this.diffD4X;
      this.d4.Y = this.y + this.diffD4Y;
    } else {
      this.d1.mouseMove(evt);
      this.d2.mouseMove(evt);
      this.d3.mouseMove(evt);
      this.d4.mouseMove(evt);
    }
  }

  isOver(x, y) {
    const left = this.d1.X < this.d4.X ? this.d4 : this.d1;
    const right = this.d2.X > this.d3.X ? this.d3 : this.d2;
    const top = this.d1.Y < this.d2.Y ? this.d2 : this.d1;
    const bottom = this.d4.Y > this.d3.Y ? this.d3 : this.d4;
    return x >= left.X + this.d1.W && x <= right.X && y >= top.Y - this.d1.H && y <= bottom.Y;
  }
}

export class Masks {

  constructor(settings) {
    this.masks = [new Mask()];
    this.editMode = true;
  }

  toggleMode() {
    this.editMode = ! this.editMode;
  }

  mouseDown(evt) {
    if (! this.editMode) return;
    for (let m of this.masks) {
      m.selected = false;
      m.mouseDown(evt);
    }
  }

  mouseUp(evt) {
    if (! this.editMode) return;
    for (let m of this.masks) {
      m.mouseUp(evt);
    }
  }

  mouseMove(evt) {
    if (! this.editMode) return;
    for (let m of this.masks) {
      m.mouseMove(evt);
    }
  }

  keyCtrlShift(evt) {
    if (! this.editMode) return;
    if (evt.key === 'A') {
      this.masks.push(new Mask());
    }
  }

  keyShift(evt) {
    console.log('shift');
  }

  keyDown(evt) {
    if (! this.editMode) return;
    if (evt.key === 'Backspace' && this.masks.length > 1) {
      this.masks = this.masks.filter(e => ! e.selected);
    }
  }

  render(ctx) {
    for (let m of this.masks) {
      m.render(ctx, this.editMode);
    }
  }
}
