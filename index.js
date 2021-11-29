import { Visual01 } from "./visuals/visual-01";
import { Visual02 } from "./visuals/visual-02";
import {Masks} from "./core/masks";

/** Settings */
const settings = {
  width: 1080,
  height: 720
}

/** Setup canvas */
const c = document.getElementById('canvas');
c.width = window.innerWidth;
c.height = window.innerHeight;

settings.width = c.width;
settings.height = c.height;

const ctx = c.getContext('2d');

/** Setup visuals */
const visuals = [];
visuals.push(new Visual01(settings));
visuals.push(new Visual02(settings));

/** Visuals dict */
let currVisual = visuals[0];

/** Frame counter */
let frame = 1;

/** Masks */
const masks = new Masks(settings);



/** Flag wether the visuals should be shown or not */
let showVisuals = true;
let showMasks = false;

/** Pass the mouse down event to the visual */
c.addEventListener('mousedown', (evt) => {
  if (currVisual) {
    currVisual.mouseDown(evt);
  }
  masks.mouseDown(evt);
});

/** Pass the mouse move event to the visual */
c.addEventListener('mousemove', (evt) => {
  if (currVisual) {
    currVisual.mouseMove(evt);
  }
  masks.mouseMove(evt);
});
/** Pass the mouse up event to the visual */
c.addEventListener('mouseup', (evt) => {
  if (currVisual) {
    currVisual.mouseUp(evt);
  }
  masks.mouseUp(evt);
});
/** Pass the mouse click event to the visual */
c.addEventListener('click', (evt) => {
  if (currVisual) {
    currVisual.mouseClick(evt);
  }
});

let isCtrlDown = false;
let isShiftDown = false;
let showTweakPane = false;
window.addEventListener('keydown', evt => {
  if (evt.key === 'Control') {
    isCtrlDown = true;
  }
  if (evt.key === 'Shift') {
    isShiftDown = true;
  }
  masks.keyDown(evt);
})

window.addEventListener('keyup', evt => {
  if (evt.key === 'Control') {
    isCtrlDown = false;
  }
  if (evt.key === 'Shift') {
    isShiftDown = false;
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
      currVisual.keyPress(evt);w2
    }
  }

  if (isCtrlDown && isShiftDown) {
    if (evt.key === 'M') {
      showMasks = ! showMasks;
    }
    if (evt.key === 'E') {
      masks.toggleMode();
    }
    if (evt.key === 'V') {
      showVisuals = ! showVisuals;
    }
    if (evt.key === 'P') {
      showTweakPane = ! showTweakPane;
      if (showTweakPane) {
        currVisual.createPane();
      } else {
        currVisual.removeTweakPane();
      }
    }
    if (showMasks) {
      masks.keyCtrlShift(evt);
    }
  }
})

const swicthVisual = (index) => {
  try {
    const v = visuals[index];
    if (v) {
      currVisual = v;
    }
  } catch (error) {
    console.error(error);
  }
}

const drawBg = () => {
  ctx.fillStyle = 'black';
  ctx.fillRect(0,0,settings.width, settings.height);
}

/** Entrypoint */
function animate(time) {
  requestAnimationFrame(animate);
  if (currVisual && showVisuals) {
    currVisual.setFrameCount(frame);
    currVisual.draw(ctx);
  } else {
    drawBg();
  }

  if (showMasks) {
    masks.render(ctx);
  }
  frame ++;
}
requestAnimationFrame(animate);
