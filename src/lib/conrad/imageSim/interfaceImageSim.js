import Conrad from '../conrad'
import Renderer from './renderer'

import ImageObject from './imageObject'

// 2D
//TODO rename
export default class InterfaceImageSim {
  constructor(canvasObject) {
    this.canvasWidth = canvasObject.width
    this.canvasHeight = canvasObject.height

    // Setup
    this.conrad = new Conrad()
    this.canvas = document.getElementById(canvasObject.id)
    this.sizes = this.conrad.sizes
    this.time = this.conrad.time
    this.renderer = new Renderer(this)
    this.resources = this.conrad.resources
    this.imageObjects = []

    // Bitmaps loaded event
    this.resources.on('ready', () => {
      // Create imageObjects
      for (const [name, imageBitmap] of Object.entries(this.resources.items)) {
        this.imageObjects.push(new ImageObject(imageBitmap, name))
      }
      console.log(this.imageObjects)
    })

    this.frameRate = 1
    this.ticksPerFrame = 60 / this.frameRate
    this.i = 0

    // Time tick event
    this.time.on('tick', () => {
      // If current tick is a multiple of ticksPerFrame
      if (this.time.frame % this.ticksPerFrame === 0) {
        this.update()
      }
    })
  }

  renderImageData(imageData) {
    this.renderer.renderImageData(imageData)
  }

  update() {
    this.imageObjects.forEach((imageObject) => {
      if (imageObject.length !== 0) {
        this.i += 1
        const yy = imageObject.osCtx.getImageData(0, 0, 256, 256)
        console.log(yy.data)
        this.renderImageData(imageObject.osCtx.getImageData(0, this.i, 256, 256), 0, 0)
      }
    })
  }
}
