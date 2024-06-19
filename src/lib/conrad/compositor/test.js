export default class Test {
  constructor(width, height) {
    this.osCanvas = new OffscreenCanvas(width, height)
    this.osCtx = this.osCanvas.getContext('2d')
    this.bufferImage = this.osCtx.createImageData(width, height)

    this.clearBuffer()
    this.update()

    this.layers = []
  }

  clearBuffer() {
    for (let i = 0; i < this.bufferImage.data.length; i += 4) {
      this.bufferImage.data[i + 0] = 5
      this.bufferImage.data[i + 1] = 5
      this.bufferImage.data[i + 2] = 5
      this.bufferImage.data[i + 3] = 255
    }
  }

  newLayer(blendMode, imageData, { transparent = false, opacity = 1 } = {}) {
    const osCanvas = new OffscreenCanvas(imageData.width, imageData.height)
    const osCtx = osCanvas.getContext('2d')
    osCtx.putImageData(imageData, 0, 0)

    this.layers.push({
      osCtx: osCtx,
      width: osCanvas.width,
      height: osCanvas.height,
      blendMode: blendMode,
      parameters: {
        transparent: transparent,
        opacity: opacity,
      },
    })
  }

  compose(yt) {
    this.layers.forEach((layer) => {
      let imageData
      if (layer.height === 2) {
        imageData = layer.osCtx.getImageData(0, 0, layer.width, layer.height)
      } else {
        imageData = layer.osCtx.getImageData(0, 1, layer.width, layer.height)
      }

      //TODO yt is between 0 and 1.
      //TODO y0 = 0
      //TODO y1 = layer.height - this.bufferImage.height //( 3 - 2 = 1 )
      //TODO interpolatedY = Math.round(lerp(y0, y1, yt))
      //TODO imageData = layer.osCtx.getImageData(interpolatedX, interpolatedY, layer.width, layer.height)

      for (let i = 0; i < 16; i += 4) {
        this.bufferImage.data[i + 0] += imageData.data[i + 0]
        this.bufferImage.data[i + 1] += imageData.data[i + 1]
        this.bufferImage.data[i + 2] += imageData.data[i + 2]
        this.bufferImage.data[i + 3] += imageData.data[i + 3]
      }
    })
    this.update()
  }

  update() {
    this.osCtx.putImageData(this.bufferImage, 0, 0)
  }
}
