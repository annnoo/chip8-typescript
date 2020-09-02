import * as chip from './Chip8'
import { CanvasRenderer } from './CanvasRenderer';
import { CanvasDrawRenderer } from './CanvasDrawRenderer';
import { SoundOutput } from './Sound/SoundOutput';
import { Chip8SoundOutput } from './Sound/Chip8SoundOutput';
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const chip8 = new chip.Chip8(new Chip8SoundOutput())


const renderer = new CanvasDrawRenderer(canvas);
const render = () => {


  renderer.render(chip8.vram);
  if (!chip8.paused) {
    if (chip8.delayTimer > 0) {
      chip8.delayTimer -= 1;
    }
    if (chip8.soundTimer > 0) {
      chip8.soundTimer -= 1;
    }
    for (let index = 0; index < 5; index++) {
      chip8.step()
    }
  }
  info.innerHTML = JSON.stringify({ ...chip8, vram: undefined });

  requestAnimationFrame(render);
}

window.addEventListener("keydown", (k) => {

  const key = parseInt(k.key, 16);
  if (key <= 16 && key !== NaN) {
    if (chip8.keys.indexOf(key) === -1) {
      chip8.keys.push(key)
    }
  }
})

window.addEventListener("keyup", (k) => {
  const key = parseInt(k.key, 16);
  if (key <= 16 && key !== NaN) {
    if (chip8.keys.indexOf(key) !== -1) {
      chip8.keys.splice(chip8.keys.indexOf(key), 1);
    }
  }


})
/**
  const sound = new SoundOutput();
  sound.playNote(200, 1000);
*/





var fileInput: HTMLInputElement = document.getElementById("myfileinput") as HTMLInputElement;
var info = document.getElementById('info');
// files is a FileList object (similar to NodeList)

fileInput.addEventListener("change", (ev) => {
  fileInput.files[0].arrayBuffer().then(i => {
    chip8.paused = true;
    chip8.reset();
    chip8.loadProgram(new Uint8Array(i));
    chip8.paused = false;
    render()
  })
}, false);


const GAME_URL = 'http://localhost:9000/test_opcode.ch8';
fetch(GAME_URL).then(res => {
  res.arrayBuffer().then(buffer => {
    chip8.loadProgram(new Uint8Array(buffer))
    render();
  })

})
