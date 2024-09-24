export default class Renderer {
  constructor(simulation) {
    this.simulation = simulation
    this.canvas = this.simulation.canvas
    this.ctx = this.canvas.getContext('2d')
    this.sizes = this.simulation.sizes
    this.time = this.simulation.time
    this.imageObject = this.simulation.imageObject

    this.ctx.imageSmoothingEnabled = false // To stop antialiasing

    //TODO temp only.
    // On second looks maybe permanent for 2d?
    this.canvas.style.width = `${this.simulation.canvasWidth}px`
    this.canvas.style.height = `${this.simulation.canvasHeight}px`
  }

  renderImageData(imageData) {
    this.canvas.width = imageData.width
    this.canvas.height = imageData.height
    this.ctx.putImageData(imageData, 0, 0)
  }
}
