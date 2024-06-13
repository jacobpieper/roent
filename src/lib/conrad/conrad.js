import Simulation from './simulation.js'
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

  addSimulation(context) {
    let simulation
    switch(context) {
      case '3d':
        simulation = new Simulation()
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