import { Renderer } from './Renderer';
import { CanvasRendererBase } from './CanvasRenderer';

export class CanvasDrawRenderer extends CanvasRendererBase {
  fps = 0;
  lastCalled = performance.now();

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
  }

  render(pixels: boolean[]): void {
    console.log(pixels.length)
    this.clear();
    pixels.forEach((item, index) => {
      let x = index % this.resolution.width;
      let y = Math.floor(index / this.resolution.width)
      this.context.fillStyle = item === true ? 'white' : 'black';
      this.context.fillRect(x * this.scale, y * this.scale, this.scale, this.scale);
    })
    this.drawFps();

  }
  clear() {
    this.context.clearRect(0, 0, this.resolution.width, this.resolution.height)
  }

  drawFps() {
    let now = performance.now();
    let delta = (now - this.lastCalled) / 1000;
    this.lastCalled = now;
    this.fps = 1 / delta;
    this.context.fillStyle = "red";
    this.context.font = "normal 16pt Arial";
    this.context.fillText(this.fps + " fps", 10, 26);
  }
}