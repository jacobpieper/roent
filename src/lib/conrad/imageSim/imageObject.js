export default class ImageObject {
  constructor(imageBitmap, name) {
    this.osCanvas = new OffscreenCanvas(imageBitmap.width, imageBitmap.height)
    this.osCtx = this.osCanvas.getContext('2d')

    this.osCtx.drawImage(imageBitmap, 0, 0)

    this.name = name
  }

  getImageData(x0, y0, width, height) {
    return this.osCtx.getImageData(x0, y0, width, height)
  }
}
