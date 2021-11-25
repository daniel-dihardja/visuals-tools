import { Visual01 } from "./visuals/visual-01";
import { Visual02 } from "./visuals/visual-02";
import {Mask} from "./mask";

/** Settings */
const settings = {
  width: 1080,
  height: 720
}

/** Setup canvas */
const c = document.getElementById('canvas');
c.width = settings.width;
c.height = settings.height;
const ctx = c.getContext('2d');

const canvasRect = canvas.getBoundingClientRect();

/** Setup visuals */
const visuals = [];
visuals.push(new Visual01(settings));
visuals.push(new Visual02(settings));

/** Visuals dict */
let currVisual = visuals[0];
currVisual.createPane();

/** Frame counter */
let frame = 1;


/** Masks */
const masks = [];
masks.push(new Mask(settings));

/** Pass the mouse down event to the visual */
c.addEventListener('mousedown', (evt) => {
  if (currVisual) {
    currVisual.mouseDown(evt);
  }
});

/** Pass the mouse move event to the visual */
c.addEventListener('mousemove', (evt) => {
  if (currVisual) {
    currVisual.mouseMove(evt);
  }
});
/** Pass the mouse up event to the visual */
c.addEventListener('mouseup', (evt) => {
  if (currVisual) {
    currVisual.mouseUp(evt);
  }
});
/** Pass the mouse click event to the visual */
c.addEventListener('click', (evt) => {
  if (currVisual) {
    currVisual.mouseClick(evt);
  }
  console.log(Math.round(evt.clientX - canvasRect.x), Math.round(evt.clientY - canvasRect.y));
  console.log(canvasRect);
});


let isCtrlDown = false;
window.addEventListener('keydown', evt => {
  if (evt.key === 'Control') {
    isCtrlDown = true;
  }
  console.log(evt);
})

window.addEventListener('keyup', evt => {
  if (evt.key === 'Control') {
    isCtrlDown = false;
  }
})

window.addEventListener('keypress', (evt) => {
  const index = parseInt(evt.key);
  if (index || index === 0) {
    swicthVisual(index);
    return;
  }

  if (currVisual) {
    if (isCtrlDown) {
      currVisual.ctrlAndKeyPress(evt);
    } else {
      currVisual.keyPress(evt);
    }
  }
})

const swicthVisual = (index) => {
  try {
    const v = visuals[index];
    if (v) {
      currVisual = v;
      currVisual.createPane();
    }
  } catch (error) {
    console.error(error);
  }
}

const renderMasks = (ctx) => {
  for (let m of masks) {
    m.render(ctx);
  }
}

/** Entrypoint */
const loop = () => {
  requestAnimationFrame(loop);
  if (currVisual) {
    currVisual.setFrameCount(frame);
    currVisual.draw(ctx);
  }
  renderMasks(ctx);
  frame ++;
}
loop();
