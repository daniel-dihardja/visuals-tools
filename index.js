import {Pane} from 'Tweakpane'
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

/** Ref to the pane */
let pane = new Pane();

/** Visuals dict */
let currVisual = visuals[0];
currVisual.createPane(pane);

/** Frame counter */
let frame = 1;

/** Mouse listeners */
c.addEventListener('mousedown', (evt) => {
  try {
    currVisual.mouseDown(evt);
  } catch(error) {

  }
});

c.addEventListener('mousemove', (evt) => {
  try {
    currVisual.mouseMove(evt);
  } catch(error) {

  }
});

c.addEventListener('mouseup', (evt) => {
  try {
    currVisual.mouseUp(evt);
  } catch(error) {

  }
});

c.addEventListener('click', (evt) => {
  try {
    currVisual.mouseClick(evt);
  } catch(error) {

  }
});


window.addEventListener('keypress', (evt) => {
  try {
    const index = parseInt(evt.key);
    const v = visuals[index];
    if (v) {
      const tp = document.querySelector('.tp-dfwv')
      tp.parentNode.removeChild(tp);
      pane = new Pane();
      currVisual = v;
      currVisual.createPane(pane);
    }
  } catch (error) {
    console.error(error);
  }
})

const loop = () => {
  requestAnimationFrame(loop);
  if (currVisual) {
    currVisual.draw(ctx, w, h, frame);
  }
  frame ++;
}
loop();
