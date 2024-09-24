import BitmapLoader from '../utils/bitmapLoader'

export default class NewCompositor {
  constructor(fileDirectory, imagesNames) {
    this.fileDirectory = fileDirectory
    this.images = []

    imagesNames.forEach((name) => {
      this.images.push({ name })
    })

    const loader = new BitmapLoader()

    loader.loadImages().then(() => {
      this.images.forEach((image, index) => {
        this.images[index].imageObject = loader.getImageObject(image.name)
      })
    })
  }

  blendImages(imageIndex1, imageIndex2) {}
}
