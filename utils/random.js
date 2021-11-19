const random = require('canvas-sketch-util/random');

export function noise1D (x, frequency, amplitude) {
  return random.noise1D(x, frequency, amplitude);
}

export function noise2D (x, y, frequency, amplitude) {
  return random.noise2D(x, y, frequency, amplitude);
}

export function noise3D (x, y, z, frequency, amplitude) {
  return random.noise3D(x, y, z, frequency, amplitude);
}
