import EventEmitter from "./eventEmitter.js"
import Simulation from "./simulation.js"

export default class Sizes extends EventEmitter {
  constructor() {
    super()

    // Setup
    this.simulation = new Simulation()
    this.canvas = this.simulation.canvas

    this.width = this.canvas.clientWidth
    this.height = this.canvas.clientHeight
    this.pixelRatio = Math.min(window.devicePixelRatio, 2)

    // Resize event
    window.addEventListener('resize', () => {
      this.width = window.clientWidth
      this.height = window.clientHeight
      this.pixelRatio = Math.min(window.devicePixelRatio, 2)

      this.trigger('resize')
    })
  }

  destroy() {
    this.off('resize')
  }
}