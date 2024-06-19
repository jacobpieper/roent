import Simulation from './3d/simulation.js'
import Time from './time.js'

let instance = null

export default class Conrad {
  constructor() {
    if (instance) {
      return instance
    }
    instance = this

    // Setup
    this.time = new Time()
    this.simulations = []
  }

  addSimulation(context, canvasObj) {
    let simulation
    switch (context) {
      case '3d':
        simulation = new Simulation(canvasObj)
        break
      case '2d':
        break
      default:
        throw new Error(`Unknown simulation context: ${context}.`)
    }
    this.simulations.push(simulation)

    return simulation
  }
}
