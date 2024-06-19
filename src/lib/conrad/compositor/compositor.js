export default class Compositor {
  constructor(width, height) {
    this.osCanvas = new OffscreenCanvas(width, height)
    this.osCtx = this.osCanvas.getContext('2d')
    
    this.bufferImageData = new ImageData(width, height)

    this.layers = []
  }

  init() {
    for (let i = 0; i < this.bufferImageData.data.length; i += 4) {
      this.bufferImageData.data[i + 3] = 255
    }
  }

  #compose() {
    this.layers.forEach((layer) => {
      if (layer.width === this.osCanvas.width && layer.height === this.osCanvas.height) {
        const imageData = layer.osCtx.getImageData(0, 0, layer.width, layer.height)
      }
    })
  }

  setWidth(width) {
    this.osCanvas.width = width
  }

  setHeight(height) {
    this.osCanvas.height = height
  }

  addImageLayer(imageData) {
    const osCanvas = new OffscreenCanvas(imageData.width, imageData.height)
    const osCtx = osCanvas.getContext('2d')
    osCtx.putImageData(imageData)
    this.layers.push(
      {
        osCtx: osCtx,
        width: osCanvas.width,
        height: osCanvas.height,
        blendMode: 'add'
      }
    )
  }

  subtractImageLayer(imageData) {
    this.layers.push(
      {
        imageData: imageData,
        blendMode: 'sub'
      }
    )
  }

  getCompositeImageData(tick) {
    this.#compose()
  }
}

ddConradImage(conradImage, { transparent = false, opacity = 1.0 } = {}) {
  if (conradImage.width < this.width || conradImage.height < this.height) {
    throw new Error('Parameter "conradImage" must be larger.')
  }

  if (conradImage.width === this.width && conradImage.height === this.height) {

  }

}