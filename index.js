import * as Tweakpane from 'Tweakpane'
import { Visual01 } from "./visuals/visual-01";

/** Settings */
const settings = {
  fps: 30
}

/** Setup canvas */
const c = document.getElementById('canvas');
c.width = 1080;
c.height = 720;
const ctx = c.getContext('2d');
const w = c.width;
const h = c.height;



/** Setup visuals */
const visuals = [];
const v1 = new Visual01();
visuals.push(v1);

/** Visuals dict */
const index = 0;
let currVisual = visuals[index];
currVisual.createPane(new Tweakpane.Pane());

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


const loop = () => {
  requestAnimationFrame(loop);
  if (currVisual) {
    currVisual.draw(ctx, w, h, frame);
  }
  frame ++;
}
loop();
