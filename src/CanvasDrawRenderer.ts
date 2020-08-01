import { Renderer } from './Renderer';
import { CanvasRendererBase } from './CanvasRenderer';

export class CanvasDrawRenderer extends CanvasRendererBase {

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
  }

  render(pixels: boolean[]): void {
    this.clear();
    this.context.fillStyle
  }
  clear() {
    this.context.clearRect(0, 0, this.resolution.width, this.resolution.height)
  }
}