
import { CPU } from './CPU'
import { createBitmapFromValues } from './CHIP-8';
console.log("test")


const canvas = document.getElementById('canvas') as HTMLCanvasElement;

const context = canvas.getContext('bitmaprenderer');


createBitmapFromValues([]).then(i => {
  context.transferFromImageBitmap(i)
})
const c = new CPU()

c.tick();
