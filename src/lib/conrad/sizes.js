import EventEmitter from './eventEmitter'
import Conrad from './conrad'

export default class Sizes extends EventEmitter {
  constructor() {
    super()

    // Setup
    this.conrad = new Conrad()
    this.canvases = this.conrad.canvases
    this.simulations = this.conrad.simulations

    this.windowWidth = window.innerWidth
    this.windowHeight = window.innerHeight
    this.pixelRatio = Math.min(window.devicePixelRatio, 2)

    // Resize event
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
      this.windowHeight = window.innerHeight
      this.pixelRatio = Math.min(window.devicePixelRatio, 2)

      this.trigger('resize')
    })
  }

  destroy() {
    this.off('resize')
  }
}
