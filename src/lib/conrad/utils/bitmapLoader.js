//TODO Pls clean up the method names in this file
//TODO make most of the names private. And then what the fuck is with the method called returnImage? This should be called getImageData....

export default class BitmapLoader {
  constructor(imageDirectory, imageFiles) {
    this.imageDirectory = imageDirectory
    this.imagePaths = this.#getImagePaths(imageDirectory, imageFiles)
    this.loadedImages = {}
    this.pendingImages = []
    this.osCanvas = new OffscreenCanvas(1, 1)
    this.osCtx = this.osCanvas.getContext('2d')
  }

  #getImagePaths(imageDirectory, imageFiles) {
    const imagePaths = []
    let imagePath
    imageFiles.map((fileParams) => {
      const fileName = fileParams.name
      imagePath = imageDirectory + fileName + '.bmp'
      imagePaths.push(imagePath)
    })
    return imagePaths
  }

  loadImages() {
    const loadPromises = this.imagePaths.map((path) => {
      return this.getImage(path).then((image) => {
        const imageData = this.getImageData(image)
        this.loadedImages[path] = imageData
      })
    })
    return Promise.all(loadPromises)
  }

  getImage(imagePath) {
    const cachedImage = this.loadedImages[imagePath]
    if (cachedImage) {
      // If image already cached return it
      return Promise.resolve(cachedImage)
    } else {
      // Else load image
      return this.loadImage(imagePath)
    }
  }

  loadImage(imagePath) {
    return new Promise((resolve, reject) => {
      const image = new Image()
      image.onload = () => {
        this.loadedImages[imagePath] = image
        this.checkAllLoaded()
        resolve(image)
      }
      image.onerror = reject
      image.src = imagePath
      this.pendingImages.push(image)
    })
  }

  checkAllLoaded() {
    const allLoaded = this.pendingImages.every((image) => image.complete)

    if (allLoaded) {
      this.pendingImages = []
      // Notify that all images are loaded
      if (typeof this.onAllLoaded === 'function') {
        this.onAllLoaded()
      }
    }
  }

  getImageData(image) {
    this.osCanvas.width = image.width
    this.osCanvas.height = image.height

    this.osCtx.drawImage(image, 0, 0)
    return this.osCtx.getImageData(0, 0, this.osCanvas.width, this.osCanvas.height)
  }

  returnImage(imageName) {
    const path = this.imageDirectory + imageName + '.bmp'
    return this.loadedImages[path]
  }
}
