import * as THREE from 'three'

import Camera from './camera.js'
import Conrad from '../conrad.js'
import Renderer from './renderer.js'

export default class Simulation {
  constructor(canvasObject) {
    this.width = canvasObject.width
    this.height = canvasObject.height
    // Setup
    this.conrad = new Conrad()
    this.canvas = document.getElementById(canvasObject.id)
    this.sizes = this.conrad.sizes
    this.time = this.conrad.time
    this.scene = new THREE.Scene()
    this.camera = new Camera(this)
    this.renderer = new Renderer(this)

    this.keepUpdated = [] //TODO temp workaround

    this.camera.setOrbitControls()
    this.scene.background = new THREE.Color(0x000000)

    // Sizes resize event
    this.sizes.on('resize', () => {
      this.resize()
    })

    // Time tick event
    this.time.on('tick', () => {
      this.update()
      //this.keepUpdated()
    })

    // Params
  }

  addObject(object) {
    this.scene.add(object)
  }

  resize() {
    this.camera.resize()
    this.renderer.resize()
  }

  update() {
    this.camera.update()
    this.keepUpdated.forEach((obj) => {
      obj.update() //TODO temp workaround
    })
    this.renderer.update()
  }

  destroy() {
    this.sizes.destroy()

    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        //TODO do we need to handle lines and points too? Should we just do instanceof Object3D?
        child.geometry.dispose()

        for (const key in child.material) {
          const value = child.material[key]

          if (value && typeof value.dispose === 'function') {
            value.dispose()
          }
        }
      }
    })

    this.camera.destroy()
    this.renderer.destroy()
  }
}
