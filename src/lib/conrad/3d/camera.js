import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls'

import Simulation from './simulation.js'

export default class Camera {
  constructor() {
    this.simulation = new Simulation()
    this.sizes = this.simulation.sizes
    this.scene = this.simulation.scene

    this.setInstance()
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      4000,
    )
    this.instance.position.set(150, 55, 110)
    this.scene.add(this.instance)
  }

  setOrbitControls() {
    this.controls = new OrbitControls(
      this.instance,
      this.simulation.renderer.instance.domElement,
    )
    this.controls.enableDamping = true
    this.controls.maxPolarAngle = Math.PI / 2
    this.controls.minDistance = 2
    this.controls.maxDistance = 700
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height
    this.instance.updateProjectionMatrix()
  }

  update() {
    this.controls.update()
  }

  destroy() {
    this.controls.dispose()
  }
}