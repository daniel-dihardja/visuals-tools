const math = require('canvas-sketch-util/math');

export function mapRange (value, inputMin, inputMax, outputMin, outputMax, clamp) {
  return math.mapRange(value, inputMin, inputMax, outputMin, outputMax, clamp)
}
