import { Renderer } from './Renderer';
import { RED, BLACK, WHITE } from './Colors';

export class CanvasRenderer extends Renderer {
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


  render(pixels: boolean[]): void {
    this.context.putImageData(this.createImageData(), 0, 0)
  }

  createImageData() {
    const imageData: ImageData = new ImageData(this.resolution.width * this.scale, this.resolution.height * this.scale);
    for (let i = 0; i < imageData.data.length; i += 4) {

      imageData.data.set(WHITE, i);

    }
    return imageData;
  }

}