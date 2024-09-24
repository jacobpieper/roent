import Time from '$lib/conrad/time'

export default class Caster {
  constructor(ctx, imageObj) {
    this.canvas = document.getElementById('tt')
    this.ctx = this.canvas.getContext('2d')
    this.canvas.width = 256
    this.canvas.height = 256

    this.imageObj = imageObj

    this.time = new Time()
  }

  renderImage(xt, yt) {
    this.ctx.putImageData(this.imageObj.getImageData(xt, yt, 256, 256), 0, 0)
  }
}

// Need to attach to a simulator class
// Then within the animation loop it interpolates the 'yt' depending on time.elapsed
