export abstract class Renderer {
  resolution = {
    width: 64,
    height: 32
  };

  get pixelCount() {
    return this.resolution.height * this.resolution.width;
  }
  pixels: boolean[] = new Array(this.pixelCount);

  abstract render(pixels: boolean[]): void;
}
