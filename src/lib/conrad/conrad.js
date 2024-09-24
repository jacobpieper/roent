import Simulation from './3d/simulation'
import InterfaceImageSim from './imageSim/interfaceImageSim'
import Time from './time'
import Sizes from './sizes'
import Parameters from './parameters'
import Resources from './resources'

let instance = null

export default class Conrad {
  constructor(canvases, sources) {
    if (instance) {
      return instance
    }
    instance = this

    // Setup
    this.canvases = canvases
    this.simulations = []
    this.time = new Time()
    this.sizes = new Sizes()
    this.parameters = new Parameters()
    this.resources = new Resources(sources)
  }

  addImageSim(canvasObject) {
    const simulation = new InterfaceImageSim(canvasObject)
    this.simulations.push(simulation)

    return simulation
  }

  add3DSim(canvasObject) {
    const simulation = new Simulation(canvasObject)
    this.simulations.push(simulation)

    return simulation
  }
}
