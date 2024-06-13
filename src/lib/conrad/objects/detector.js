import IndexedObject from "./indexedObject.js"

export default class Detector extends IndexedObject{
  constructor(simulation) {
    super(simulation)

    this._verticesArray = [
      -21.5, 0, -17.5,
      -21.5, 0, 17.5,
      21.5, 0, 17.5,
      21.5, 0, -17.5,
      -21.5, -1, -17.5,
      -21.5, -1, 17.5,
      21.5, -1, 17.5,
      21.5, -1, -17.5
    ]
    this._indicesArray = [0, 1, 2, 2, 3, 0, 4, 6, 5, 6, 4, 7, 4, 0, 3, 3, 7, 4, 5, 1, 0, 0, 4, 5, 6, 2, 1, 1, 5, 6, 7, 3, 2, 2, 6, 7]
    this._shaderType = 'meshBasic'
    this._materialParameters = { color: 0x220022 }
    this._name = 'detector'


    this._setInstance()

  }
}