export default class ImageObject {
  constructor(imageData) {
    this.osCanvas = new OffscreenCanvas(imageData.width, imageData.height)
    this.osCtx = this.osCanvas.getContext('2d')

    this.osCtx.putImageData(imageData)
  }

  getImageData(x0, y0, width, height) {
    return this.osCtx.getImageData(x0, y0, width, height)
  }
}
