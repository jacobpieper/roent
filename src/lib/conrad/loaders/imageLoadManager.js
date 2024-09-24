import * as THREE from 'three'

import LoadManager from './loadManager'

export default class ImageLoadManager extends LoadManager {
  constructor(sources) {
    super(sources)

    this.setLoaders()
    this.startLoading()
  }

  setLoaders() {
    this.loaders.bitmap = new THREE.ImageBitmapLoader()
  }

  startLoading() {
    // Load each source
    for (const source in this.sources) {
      switch (source.type) {
        case 'bitmap':
          this.loaders.bitmap.load(source.path, (file) => {
            this.sourceLoaded(source, file)
          })
          break

        default:
          throw new Error(`"${source.type}" is not a valid resource type`)
      }
    }
  }
}
