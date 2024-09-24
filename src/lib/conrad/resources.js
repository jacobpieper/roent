import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader'

import EventEmitter from './eventEmitter'

export default class Resources extends EventEmitter {
  constructor(sources) {
    super()

    // Options
    this.sources = sources

    // Setup
    this.loaders = {}
    this.items = {}
    this.toLoad = this.sources.length
    this.loaded = 0

    this.setLoaders()
    this.startLoading()
  }

  setLoaders() {
    this.loaders.gltf = new GLTFLoader()
    this.loaders.texture = new THREE.TextureLoader()
    this.loaders.cubeTexture = new THREE.CubeTextureLoader()
    this.loaders.bitmap = new THREE.ImageBitmapLoader()

    this.items.gltf = {}
    this.items.texture = {}
    this.items.cubeTexture = {}
    this.items.imageBitmap = {}
  }

  startLoading() {
    // Load each source
    for (const source of this.sources) {
      switch (source.type) {
        case 'gltf':
          this.loaders.gltf.load(source.path, (file) => {
            this.sourceLoaded(source, file)
          })
          break

        case 'texture':
          this.loaders.texture.load(source.path, (file) => {
            this.sourceLoaded(source, file)
          })
          break

        case 'cubeTexture':
          this.loaders.cubeTexture.load(source.path, (file) => {
            this.sourceLoaded(source, file)
          })
          break

        case 'imageBitmap':
          this.loaders.bitmap.load(source.path, (file) => {
            this.sourceLoaded(source, file)
          })
          break
      }
    }
  }

  sourceLoaded(source, file) {
    this.items[source.type][source.name] = file
    this.loaded++

    if (this.loaded === this.toLoad) {
      this.trigger('ready')
    }
  }
}
