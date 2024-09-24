import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls'

export default class Camera {
  constructor(simulation) {
    this.simulation = simulation
    this.sizes = this.simulation.sizes
    this.scene = this.simulation.scene

    this.setInstance()
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.simulation.width / this.simulation.height,
      0.1,
      4000
    )
    this.instance.position.set(150, 55, 110)
    this.scene.add(this.instance)
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.instance, this.simulation.renderer.instance.domElement)
    this.controls.enableDamping = true
    this.controls.maxPolarAngle = Math.PI / 2
    this.controls.minDistance = 2
    this.controls.maxDistance = 700
  }

  resize() {
    this.instance.aspect = this.simulation.width / this.simulation.height
    this.instance.updateProjectionMatrix()
  }

  update() {
    this.controls.update()
  }

  destroy() {
    this.controls.dispose()
  }
}
