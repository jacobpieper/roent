import { GLTFLoader } from 'three/addons/loaders/GLTFLoader'

import LoadManager from './loadManager'

export default class ModelLoadManager extends LoadManager {
  constructor(sources) {
    super(sources)

    this.setLoaders()
    this.startLoading()
  }

  setLoaders() {
    this.loaders.gltf = new GLTFLoader()
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

        default:
          throw new Error(`"${source.type}" is not a valid type of resource`)
      }
    }
  }
}
