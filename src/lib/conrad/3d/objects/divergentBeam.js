import * as THREE from 'three'

import IndexedObject from './indexedObject'
import ReceptorArea from './receptorArea'
import Floor from './floor'

export default class DivergentBeam extends IndexedObject {
  constructor(simulation) {
    super(simulation)

    // Dependencies
    this.floor = new Floor(simulation)
    this.receptorArea = new ReceptorArea(simulation)

    // Attributes
    this.collimatorX = 2
    this.collimatorZ = 3
    this.scd = 20 // Source collimator distance
    this.sid = 100 // Source image distance

    // For updates
    this.currentCollimatorX
    this.currentCollimatorZ
    this.currentScd
    this.currentSid

    this._verticesArray = [
      0,
      0,
      0, // vector0: origin
      0,
      0,
      0, // vector1: receptorArea
      0,
      0,
      0, // vector2: receptorArea
      0,
      0,
      0, // vector3: receptorArea
      0,
      0,
      0, // vector4: receptorArea
      0,
      0,
      0, // vector5: dirVector
      0,
      0,
      0, // vector6: dirVector
      0,
      0,
      0, // vector7: dirVector
      0,
      0,
      0, // vector8: dirVector
    ]
    this._indicesArray = [0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 1]
    this._shaderType = 'meshBasic'
    this._materialParameters = { color: 0xffffff, wireframe: true }
    this._name = 'divergentBeam'

    this._setInstance()

    this.update()
  }

  #setOriginVector() {
    const v3 = new THREE.Vector3()

    v3.x = 0
    v3.y = this.sid
    v3.z = 0

    this.setVertex(0, v3)
  }

  #setDirectionVectors() {
    const polarity = [-1, -1, -1, 1, 1, 1, 1, -1]
    const y = this.scd * -1

    for (let i = 0; i < 4; i++) {
      const v3 = new THREE.Vector3()

      const index = i * 2

      v3.x = this.collimatorX * polarity[index + 0]
      v3.y = y
      v3.z = this.collimatorZ * polarity[index + 1]

      v3.normalize()
      const dirVerticesIndex = i + 5 // Directional vertices are at index 5-8 in this.vertices
      this.setVertex(dirVerticesIndex, v3)
    }
  }

  #setReceptorVectors() {
    const origin = this.getV3(0)

    const raycaster = new THREE.Raycaster()

    // Get dirVectors from this.position.array
    const dirVectors = this.getV3Array(5, 4)

    dirVectors.forEach((dirV3, index) => {
      raycaster.set(origin, dirV3)

      // Get coordinates of ray intercect with floor
      const intercect = raycaster.intersectObject(this.floor.instance)
      this.setVertex(index + 1, intercect[0].point)
    })
  }

  #setReceptorArea() {
    const v3Array = this.getV3Array(1, 4)
    v3Array.forEach((v3, index) => {
      this.receptorArea.setVertex(index, v3)
    })
  }

  update() {
    // Check if vertices need recalculating
    if (
      this.collimatorX !== this.currentCollimatorX ||
      this.collimatorZ !== this.currentCollimatorZ ||
      this.scd !== this.currentScd ||
      this.sid !== this.currentSid
    ) {
      this.#setOriginVector()
      this.#setDirectionVectors()
      this.#setReceptorVectors()
      this.#setReceptorArea()
      this.receptorArea.update()

      this.position.needsUpdate = true

      this.currentCollimatorX = this.collimatorX
      this.currentCollimatorZ = this.collimatorZ
      this.currentScd = this.scd
      this.currentSid = this.sid
    }
    this._update()
  }
}
