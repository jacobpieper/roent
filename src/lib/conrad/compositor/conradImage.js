export default class ConradImage {
  constructor(imageData) {
    this.width = imageData.width
    this.height = imageData.height
    this.osCanvas = new OffscreenCanvas(this.width, this.height)
    this.osCtx = this.osCanvas.getContext('2d')
  }

  getImageData(x0, y0, width, height) {
    return this.osCtx.getImageData(x0, y0, width, height)
  }
}
