import * as chip from './chip8'
import { CanvasRenderer } from './CanvasRenderer';
import { CanvasDrawRenderer } from './CanvasDrawRenderer';
import { SoundOutput } from './Sound';
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const l = new chip.Chip8()
console.log("h21i")

const renderer = new CanvasDrawRenderer(canvas);
const render = () => {
  let arr = []
  for (let i = 0; i < 32 * 64; i++) {
    arr[i] = Math.random() <= 0.5;
  }
  renderer.render(arr);
  requestAnimationFrame(render);
}
const sound = new SoundOutput();
sound.playMelody();
render();

