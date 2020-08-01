import * as chip from './chip8'
import { CanvasRenderer } from './CanvasRenderer';
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const l = new chip.Chip8()
console.log("h21i")

const renderer = new CanvasRenderer(canvas);
const render = () => {
  renderer.render([])
  requestAnimationFrame(render);
}
render();

