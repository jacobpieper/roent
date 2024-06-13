import * as THREE from 'three'

export default class IndexedObject {
  constructor(simulation) {
    //TODO set up defaults / error handling

    // Setup
    this.simulation = simulation
    this.scene = this.simulation.scene
    this.time = this.simulation.time

    // This is a parent class for custom indexed geometries.
    // The following attributes should be set within the constructors of the child classes.      
    // Make sure to call this._setInstance at the end of the child constructors.
    this._shaderType
    this._materialParameters = {}
    this._verticesArray = []
    this._indicesArray = []
    this._uvArray = [1.0, 0.0, 0.0, 1.0, 1.0, 1.0] // Default
    this._name

    // Public attributes
    this.vertices
    this.indices
    this.uv
    this.geometry = new THREE.BufferGeometry()
    this.position
    this.instance
  }

  /**
   * PRIVATE METHODS
   */

  #setVertices() {
    // Handle errors
    if (!Array.isArray(this._verticesArray)) {
      throw new Error(`Parameter 'verticesArray' must be of type Array.`)
    } else if (this._verticesArray.length % 3 !== 0) {
      throw new Error(`Parameter 'verticesArray' length of (${this._verticesArray.length}) is not valid. Expected length should be divisable by 3.`)
    }

    return new Float32Array(this._verticesArray)
  }

  #setIndices() {
    // Handle errors
    if (!Array.isArray(this._indicesArray)) {
      throw new Error(`Parameter 'indicesArray' must be of type Array.`)
    }

    return this._indicesArray
  }

  #setUV() {
    // Handle errors
    if (!Array.isArray(this._uvArray)) {
      throw new Error(`Parameter 'uvArray' must be of type Array.`)
    }

    return new Float32Array(this._uvArray)
  }

  #setShader() {
    // soz
    switch(this._shaderType) {
      case 'lineBasic':
        return new THREE.Line(this.geometry, new THREE.LineBasicMaterial(this._materialParameters))
      case 'lineDashed':
        return new THREE.Line(this.geometry, new THREE.LineDashedMaterial(this._materialParameters))
      case 'meshBasic':
        return new THREE.Mesh(this.geometry, new THREE.MeshBasicMaterial(this._materialParameters))
      case 'meshDepth':
        return new THREE.Mesh(this.geometry, new THREE.MeshDepthMaterial(this._materialParameters))
      case 'meshLambert':
        return new THREE.Mesh(this.geometry, new THREE.MeshLambertMaterial(this._materialParameters))
      case 'meshMatcap':
        return new THREE.Mesh(this.geometry, new THREE.MeshMatcapMaterial(this._materialParameters))
      case 'meshNormal':
        return new THREE.Mesh(this.geometry, new THREE.MeshNormalMaterial(this._materialParameters))
      case 'meshPhong':
        return new THREE.Mesh(this.geometry, new THREE.MeshPhongMaterial(this._materialParameters))
      case 'meshPhysical':
        return new THREE.Mesh(this.geometry, new THREE.MeshPhysicalMaterial(this._materialParameters))
      case 'meshStandard':
        return new THREE.Mesh(this.geometry, new THREE.MeshStandardMaterial(this._materialParameters))
      case 'meshToon':
        return new THREE.Mesh(this.geometry, new THREE.MeshToonMaterial(this._materialParameters))
      case 'points':
        return new THREE.Points(this.geometry, new THREE.PointsMaterial(this._materialParameters))
      default:
        throw new Error(`No shaderType "${this._shaderType}" exists.`)
    }
  }

  /**
   * PROTECTED METHODS
   */

  _setInstance() {
    // Set attributes
    this.vertices = this.#setVertices()
    this.geometry.setAttribute('position', new THREE.BufferAttribute(this.vertices, 3))
    
    this.indices = this.#setIndices()
    this.geometry.setIndex(this.indices)
    
    this.position = this.geometry.getAttribute('position')
    
    this.uv = this.#setUV()
    this.geometry.setAttribute('uv', new THREE.BufferAttribute(this.uv, 2))
    
    // Set instance
    this.instance = this.#setShader()
    this.instance.name = this._name

    //TODO probs shouldn't add to scene here. Maybe from within the simulation class?
    this._update()
    this.addToScene()
  }

  _update() {
    this.geometry.computeVertexNormals()
    this.geometry.setAttribute('uv', new THREE.BufferAttribute(this.uv, 2))
    this.instance.updateMatrix()
  }

  /**
  * PUBLIC METHODS
  */

  setVertex(index, v3) {
    const i = index * 3
    this.position.array[i + 0] = v3.x
    this.position.array[i + 1] = v3.y
    this.position.array[i + 2] = v3.z
  }

  getV3(index) {
    const i = index * 3
    const v3 = new THREE.Vector3(
      this.position.array[i + 0],
      this.position.array[i + 1],
      this.position.array[i + 2]
    )

    return v3
  }

  getV3Array(index, length) {
    length += index
    const v3Array = []

    while (index < length) {
      v3Array.push(this.getV3(index))
      index ++
    }

    return v3Array
  }

  get2dArray(index, length) {
    const array2d = []
    this.getV3Array(index, length)
      .forEach((v3) => {
        for (const v of Object.entries(v3)) {
          array2d.push(v[1])
        }
      })

      return array2d
  }

  addToScene() {
    this.scene.add(this.instance)
  }

  removeFromScene() {
    this.scene.remove(this.instance)
  }
}