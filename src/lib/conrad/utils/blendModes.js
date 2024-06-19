export default class BlendModes {
  static addition(image1, image2) {
    const output = new ImageData(image1.width, image1.height)

    const data1 = image1.data
    const data2 = image2.data
    const dataOut = output.data

    for (let i = 0; i < data1.length; i += 4) {
      // Perform addition. Clamping is handled by Uint8ClampedArray
      dataOut[i + 0] = data1[i + 0] + data2[i + 0]
      dataOut[i + 1] = data1[i + 1] + data2[i + 1]
      dataOut[i + 2] = data1[i + 2] + data2[i + 2]

      // Set alpha to the maximum of the two alpha values
      dataOut[i + 3] = Math.max(data1[i + 3], data2[i + 3])
    }

    return output
  }

  static subtraction(image1, image2) {
    const output = new ImageData(image1.width, image1.height)

    const data1 = image1.data
    const data2 = image2.data
    const dataOut = output.data

    for (let i = 0; i < data1.length; i += 4) {
      // Perform subtraction. Clamping is handled by Uint8ClampedArray
      dataOut[i + 0] = data1[i + 0] - data2[i + 0]
      dataOut[i + 1] = data1[i + 1] - data2[i + 1]
      dataOut[i + 2] = data1[i + 2] - data2[i + 2]

      // Set alpha to the maximum of the two alpha values
      dataOut[i + 3] = Math.max(data1[i + 3], data2[i + 3])
    }

    return output
  }

  static inverse(image) {
    const output = new ImageData(image.width, image.height)

    const data = image.data
    const dataOut = output.data

    for (let i = 0; i < data.length; i += 4) {
      dataOut[i + 0] = 255 - data[i + 0]
      dataOut[i + 1] = 255 - data[i + 1]
      dataOut[i + 2] = 255 - data[i + 2]
      dataOut[i + 3] = data[i + 3]
    }

    return output
  }
}
