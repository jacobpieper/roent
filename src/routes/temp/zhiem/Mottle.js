export default class Mottle {
	constructor(mean, sd, arrayLength) {
		this.mean = mean
		this.sd = sd
		this.arrayLength = arrayLength
	}

	addToImage(imageData, sd) {
		this.sd = sd
		const normalNoiseArray = this.generateNoiseArray()
		for (let i = 0; i < imageData.data.length; i += 4) {
			const randIndex = Math.floor(Math.random() * normalNoiseArray.length)
			const pixelNoise = normalNoiseArray[randIndex]

			// Apply noise
			imageData.data[i + 0] += pixelNoise
			imageData.data[i + 1] += pixelNoise
			imageData.data[i + 2] += pixelNoise
		}

		return imageData
	}

	generateNoiseArray() {
		const noiseArray = []
		for (let i = 0; i < this.arrayLength; i++) {
			noiseArray.push(this.getNormalValue())
		}
		return noiseArray
	}

	getNormalValue() {
		let u = 0,
			v = 0
		while (u === 0) u = Math.random()
		while (v === 0) v = Math.random()
		return this.mean + this.sd * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
	}
}
