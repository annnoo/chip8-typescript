type ImageRendererFunction = (image: boolean[]) => void;


export class CHIP8 {

  rendererFunctions: ImageRendererFunction[] = []



  registerImageRenderer(fn: ImageRendererFunction) {
    return this.rendererFunctions.push(fn);
  }
  renderImage(image: boolean[]) {
    this.rendererFunctions.forEach(i => i(image))
  }
}
interface Color {
  r: number;
  g: number;
  b: number;
  a?: number;
}

export function setPixel(i: ImageData, pos: number, color: Color) {
  i.data[pos + 0] = color.r;
  i.data[pos + 1] = color.g;
  i.data[pos + 2] = color.b;
  i.data[pos + 3] = color.a === undefined ? 255 : color.a;
}

export const createBitmapFromValues = async (bools: boolean[]): Promise<ImageBitmap> => {
  ImageBitmap
  const data = new Uint8ClampedArray(10000);
  let imgData: ImageData = new ImageData(100, 100);
  for (let i = 0; i < imgData.data.length; i += 4) {
    setPixel(imgData, i, { r: 120, g: 120, b: 220, a: 255 })
  }
  return await createImageBitmap(imgData)

}
