import Conrad from '../conrad'
import ImageObject from './imageObject'

export default class ImageBlender {
  constructor(imageObject1, imageObject2, outputWidth, outputHeight) {
    this.imageObject1 = imageObject1
    this.imageObject2 = imageObject2

    this.outputWidth = outputWidth
    this.outputHeight = outputHeight

    // Setup
    this.conrad = new Conrad()
    this.time = this.conrad.time
    this.resources = this.conrad.resources
    this.imageObjects = []

    // Bitmap loader event
    this.resources.on('ready', () => {
      // Create imageObjects
      for (const [name, imageBitmap] of Object.entries(this.resources.items)) {
        this.imageObjects.push(new ImageObject(imageBitmap, name))
      }
    })
  }
}
