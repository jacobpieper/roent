import IndexedObject from './indexedObject'

export default class ReceptorArea extends IndexedObject {
  constructor(simulation) {
    super(simulation)

    this._verticesArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    this._indicesArray = [0, 2, 3, 1, 2, 0]
    this._shaderType = 'meshBasic'
    this._materialParameters = { color: 0x777777 }
    this._name = 'receptorArea'

    this._setInstance()
  }

  update() {
    this.instance.getWorldPosition.y = 0.1 // To stop z-fighting with floor
    this.position.needsUpdate = true
    this._update()
  }
}
