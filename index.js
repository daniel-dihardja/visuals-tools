import { Visual01 } from "./visuals/visual-01";
import { Visual02 } from "./visuals/visual-02";

/** Setup canvas */
const c = document.getElementById('canvas');
c.width = 1080;
c.height = 720;

const ctx = c.getContext('2d');
const w = c.width;
const h = c.height;

/** Setup visuals */
const visuals = [];
visuals.push(new Visual01());
visuals.push(new Visual02());

/** Visuals dict */
let currVisual = visuals[0];
currVisual.createPane();

/** Frame counter */
let frame = 1;

/** Mouse listeners */
c.addEventListener('mousedown', (evt) => {
  if (currVisual) {
    currVisual.mouseDown(evt);
  }
});

c.addEventListener('mousemove', (evt) => {
  if (currVisual) {
    currVisual.mouseMove(evt);
  }
});

c.addEventListener('mouseup', (evt) => {
  if (currVisual) {
    currVisual.mouseUp(evt);
  }
});

c.addEventListener('click', (evt) => {
  if (currVisual) {
    currVisual.mouseClick(evt);
  }
});

window.addEventListener('keypress', (evt) => {
  try {
    const index = parseInt(evt.key);
    const v = visuals[index];
    if (v) {
      currVisual = v;
      currVisual.createPane();
    }
  } catch (error) {
    console.error(error);
  }
  currVisual.keyPress(evt);
})

const loop = () => {
  requestAnimationFrame(loop);
  if (currVisual) {
    currVisual.draw(ctx, w, h, frame);
  }
  frame ++;
}
loop();
