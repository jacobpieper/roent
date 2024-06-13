import IndexedObject from "./indexedObject.js"

export default class Floor extends IndexedObject{
  constructor(simulation) {
    super(simulation)

    this._verticesArray = [
      -1000, 0, -1000,
      -1000, 0, 1000,
      1000, 0, 1000,
      1000, 0, -1000
    ]
    this._indicesArray = [0, 1, 2, 2, 3, 0]
    this._shaderType = 'meshBasic'
    this._materialParameters = { color: 0x00ffff, opacity: 0, transparent: true }
    this._name = 'floor'

    this._setInstance()

    this.instance.translateY(-0.01) // To stop z-fighting
  }
}