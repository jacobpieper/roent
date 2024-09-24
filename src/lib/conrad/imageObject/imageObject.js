export default class ImageObject {
  constructor(imageData) {
    this.width = imageData.width
    this.height = imageData.height

    // Create offscreen canvas and context
    this.osCanvas = new OffscreenCanvas(this.width, this.height)
    this.osCtx = this.osCanvas.getContext('2d')
    this.osCtx.putImageData(imageData, 0, 0)
  }

  getImageData(x0, y0, width, height) {
    return this.osCtx.getImageData(x0, y0, width, height)
  }

  applyWindowing(windowLevel, windowWidth) {
    // Calculate min and max based on WL and WW
    const min = windowLevel - windowWidth / 2
    const max = windowLevel + windowWidth / 2

    // Get the imageData from the offscreen canvas
    const imageData = this.getImageData(0, 0, this.width, this.height)
    const data = imageData.data

    // Adjust each pixel value based on WL and WW
    for (let i = 0; i < data.length; i += 4) {
      for (let j = 0; j < 3; j++) {
        // Loop through R, G, B channels (ignore alpha)
        let pixelValue = data[i + j]

        // Apply the windowing formula
        if (pixelValue <= min) {
          pixelValue = 0
        } else if (pixelValue >= max) {
          pixelValue = 255
        } else {
          pixelValue = ((pixelValue - min) / windowWidth) * 255
        }

        // Update the pixel value
        data[i + j] = pixelValue
      }
    }

    // Put the adjusted imageData back on the offscreen canvas
    this.osCtx.putImageData(imageData, 0, 0)
  }
}
