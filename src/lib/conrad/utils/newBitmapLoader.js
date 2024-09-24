import ImageObject from './imageObject'

export default class BitmapLoader {
  constructor(imageDirectory, imageFiles) {
    this.imageDirectory = imageDirectory
    this.imageFiles = imageFiles
    this.imagePaths = this.#getImagePaths()
    this.loadedImages = {}
    this.pendingImages = []
  }

  #getImagePaths() {
    const imagePaths = []
    let imagePath
    this.imageFiles.map((fileParams) => {
      const fileName = fileParams.name
      imagePath = this.imageDirectory + fileName + '.bmp'
      imagePaths.push(imagePath)
    })
    return imagePaths
  }

  loadImages() {
    const loadPromises = this.imagePaths.map((path) => {
      return this.#getImageFromFile(path).then((image) => {
        this.loadedImages[path] = new ImageObject(image)
      })
    })
    return Promise.all(loadPromises)
  }

  #getImageFromFile(imagePath) {
    const cachedImage = this.loadedImages[imagePath]
    if (cachedImage) {
      // If image already chached return it
      return new Promise.resolve(cachedImage)
    } else {
      // Else load image
      return new Promise((resolve, reject) => {
        const image = new Image()
        image.onload = () => {
          this.loadedImages[imagePath] = image
          this.#checkAllLoaded()
          resolve(image)
        }
        image.onerror = reject

        image.src = imagePath
        this.pendingImages.push(image)
      })
    }
  }

  #checkAllLoaded() {
    const allLoaded = this.pendingImages.every((image) => image.complete)

    if (allLoaded) {
      this.pendingImages = []
    }
  }
}
