/**
 * interface for the visuals
 */
export class Visual {
  constructor(settings) {
    this.scenes = {}
    this.frameCount = 1;
    this.width = settings.width;
    this.height = settings.height;
  }

  setFrameCount(val) {
    this.frameCount = val;
  }

  storeScenes(key) {
    window.localStorage.setItem(key, JSON.stringify(this.scenes));
  }
  getScenes(key) {
    this.scenes = JSON.parse(window.localStorage.getItem(key)) || {};
  }
  setParams(params, newParams) {
    Object.keys(newParams).forEach(key => {
      params[key] = newParams[key];
    });
  }
  removeTweakPane() {
    const tp = document.querySelector('.tp-dfwv')
    if (tp) {
      tp.parentNode.removeChild(tp);
    }
  }
  mouseDown(evt) {}
  mouseUp(evt) {}
  mouseMove(evt) {}
  mouseClick(evt) {}
  keyPress(evt) {}
  ctrlAndKeyPress(evt) {}
  onMidiMessage(evt) {}
  draw(ctx, width, height, frame) {}
  createPane() {}
}
