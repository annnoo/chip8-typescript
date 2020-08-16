import * as chip from './Chip8'
import { CanvasRenderer } from './CanvasRenderer';
import { CanvasDrawRenderer } from './CanvasDrawRenderer';
import { SoundOutput } from './SoundOutput';
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const chip8 = new chip.Chip8()
console.log("h21i")

const renderer = new CanvasDrawRenderer(canvas);
const render = () => {
  let arr = []
  for (let i = 0; i < 32 * 64; i++) {
    arr[i] = Math.random() <= 0.5;
  }
  renderer.render(chip8.vramFlattened);
  chip8.step()
  info.innerHTML = JSON.stringify(chip8);

  requestAnimationFrame(render);
}
/**
  const sound = new SoundOutput();
  sound.playNote(200, 1000);
*/





var fileInput: HTMLInputElement = document.getElementById("myfileinput") as HTMLInputElement;
var info = document.getElementById('info');
// files is a FileList object (similar to NodeList)
console.log(fileInput);

fileInput.addEventListener("change", (ev) => {
  console.log(ev);
  console.log(fileInput.files[0].arrayBuffer().then(i => {
    console.log(i);
    chip8.loadProgram(new Uint8Array(i));
    console.log(chip8);
    render()
  }))
}, false);


