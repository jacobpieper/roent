import * as THREE from 'three'

export default class Renderer {
  constructor(simulation) {
    this.simulation = simulation
    this.canvas = this.simulation.canvas
    this.sizes = this.simulation.sizes
    this.scene = this.simulation.scene
    this.camera = this.simulation.camera

    this.setInstance()
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      logarithmicDepthBuffer: true,
    })

    this.instance.setSize(this.simulation.width, this.simulation.height)
    this.instance.setPixelRatio(this.sizes.pixelRatio)
  }

  resize() {
    this.instance.setSize(this.simulation.width, this.simulation.height)
    this.instance.setPixelRatio(this.sizes.pixelRatio)
  }

  update() {
    this.instance.render(this.scene, this.camera.instance)
  }

  destroy() {
    this.instance.dispose()
  }
}
