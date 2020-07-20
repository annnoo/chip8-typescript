import { Renderer } from './Renderer';

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
      // Percentage in the x direction, times 255
      let x = (i % 40) / 40 * 255;
      // Percentage in the y direction, times 255
      let y = Math.ceil(i / 400) / 100 * 255;

      // Modify pixel data
      imageData.data[i + 0] = 0;        // R value
      imageData.data[i + 1] = 0;        // G value
      imageData.data[i + 2] = 0;  // B value
      imageData.data[i + 3] = 255;      // A value
    }
    return imageData;
  }

}