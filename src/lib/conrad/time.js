import EventEmitter from './eventEmitter.js'

export default class Time extends EventEmitter {
  constructor() {
    super()

    // Setup
    this.start = Date.now()
    this.current = this.start
    this.elapsed = 0
    this.delta = 16
    this.frame = 0

    window.requestAnimationFrame(() => {
      this.tick()
    })
  }

  tick() {
    const currentTime = Date.now()
    this.delta = currentTime - this.current
    this.current = currentTime
    this.elapsed = this.current - this.start
    this.frame ++

    this.trigger('tick')

    window.requestAnimationFrame(() => {
      this.tick()
    })
  }

  destroy() {
    this.off('tick')
  }
}