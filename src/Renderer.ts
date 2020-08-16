export abstract class Renderer {
  resolution = {
    width: 64,
    height: 32
  };

  constructor(width = 64, height = 32) {
    this.resolution.width = width;
    this.resolution.height = height;
  }

  get pixelCount() {
    return this.resolution.height * this.resolution.width;
  }
  pixels: boolean[] = new Array(this.pixelCount);

  abstract render(pixels: boolean[]): void;
}
