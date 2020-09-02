import { Renderer } from './Renderer';
import { RED, BLACK, WHITE } from './Colors';

export abstract class CanvasRendererBase extends Renderer {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D;
  scale: number = 1;
  constructor(canvas: HTMLCanvasElement) {
    super();
    console.log(canvas.height)
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d')
    this.scale = this.canvas.height / this.resolution.height;
  }
}

export class CanvasRenderer extends CanvasRendererBase {

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
  }


  render(pixels: boolean[]): void {
    this.context.putImageData(this.createImageData(pixels), 0, 0)


    this.context.drawImage(this.canvas, 0, 0, this.resolution.width, this.resolution.height, 0, 0, this.canvas.width, this.canvas.height)

  }

  createImageData(pixels: boolean[]) {
    const imageData: ImageData = new ImageData(this.resolution.width, this.resolution.height);
    for (let i = 0; i < imageData.data.length; i += 4) {
      Math.floor(Math.random() * 2) < 1 ? imageData.data.set(BLACK, i) : imageData.data.set(RED, i);
    }
    return imageData;
  }

}