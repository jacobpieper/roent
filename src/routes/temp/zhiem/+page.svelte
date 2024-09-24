<script>
  import { onMount } from 'svelte'
  import Mottle from './Mottle'
  import testpattern from '../lib/images/testpattern.bmp'

  let canvas, ctx, originalImage, currentImage
  let cursorX = 0
  let cursorY = 0
  let isCursorOverCanvas = false
  let isSpacebarPressed = false

  let fluoro = null
  let frameRate = 4
  let frameQueue = []
  let sd = 50
  let recursiveFilter = true
  let latency = 0

  let alpha = 0.25

  const mottle = new Mottle(0, sd, 1000)

  onMount(() => {
    setCanvas()

    originalImage = newLoadImage()
    document.getElementById('testpattern')
    //loadImage('/src/lib/images/testpattern.bmp').then((loadedImage) => {
    //	originalImage = loadedImage
    //	currentImage = loadedImage
    //})

    // Create event listeners
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseLeave', handleMouseLeave)

    window.addEventListener('keydown', handleKeyDown)
    //window.addEventListener('keyup', handleKeyUp)

    document.getElementById('frameRate').addEventListener('input', handleFrameRateChange)
    document.getElementById('dose').addEventListener('input', handleDoseChange)
    document.getElementById('alpha').addEventListener('input', handleAlphaChange)
    document.getElementById('latency').addEventListener('input', handleLatencyChange)

    // create mottle
    //create timeManager
    //spacebar event listeners
    //mouse event listeners
    // user input
  })

  function newLoadImage() {
    const image = document.getElementById('testpattern')
    const osCanvas = new OffscreenCanvas(512, 512)
    osCanvas.width = 512
    osCanvas.height = 512
    const osCtx = osCanvas.getContext('2d')
    osCtx.drawImage(image, 0, 0)
    const imageData = osCtx.getImageData(0, 0, 512, 512)
    return imageData
  }

  function setCanvas() {
    canvas = document.getElementById('canvasMain')
    canvas.width = 512
    canvas.height = 512
    ctx = canvas.getContext('2d')
  }

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const image = new Image()
      image.src = src

      image.onload = () => {
        const osCanvas = new OffscreenCanvas(image.width, image.height)
        const osCtx = osCanvas.getContext('2d')

        osCtx.drawImage(image, 0, 0)
        const imageData = osCtx.getImageData(0, 0, image.width, image.height)

        resolve(imageData)
      }

      image.onerror = (err) => {
        reject(new Error(`Failed to load image from "${src}": ${err}.`))
      }
    })
  }

  function handleMouseMove(event) {
    const rect = canvas.getBoundingClientRect()
    cursorX = event.clientX - rect.left
    cursorY = event.clientY - rect.top
    isCursorOverCanvas = true
    //console.log(cursorX, cursorY)
  }

  function handleMouseLeave() {
    isCursorOverCanvas = false
    console.log('Cursor has left the canvas.')
  }

  function handleKeyDown(event) {
    if (event.code === 'Space' && !isSpacebarPressed) {
      isSpacebarPressed = true
      console.log('Space Down')
      startFluoro()
    }
  }

  function handleKeyUp(event) {
    if (event.code === 'Space' && isSpacebarPressed) {
      isSpacebarPressed = false
      console.log('Space Up')
      stopFluoro()
    }
  }

  function handleFrameRateChange(event) {
    const newFrameRate = parseInt(event.target.value, 10)
    if (newFrameRate > 0 && newFrameRate <= 16) {
      frameRate = newFrameRate
      console.log(`Frame rate updated to: ${frameRate} FPS`)
      stopFluoro()
      if (isSpacebarPressed) {
        startFluoro()
      }
    }
  }

  function handleDoseChange(event) {
    const newDose = parseInt(event.target.value, 10)
    if (newDose >= 10 && newDose <= 90) {
      sd = newDose
      console.log(`Quantum mottle normal distribution standard deviation updated to: ${sd}`)
    }
  }

  function handleAlphaChange(event) {
    const newAlpha = event.target.value
    console.log(newAlpha)
    if (newAlpha >= 0.1 && newAlpha <= 1) {
      alpha = newAlpha
      console.log(`Recursive filter alpha value has been updated to: ${alpha}`)
    }
  }

  function handleLatencyChange(event) {
    latency = event.target.value
    console.log(`Latency value has been updated to: ${latency} ms`)
    stopFluoro()
    if (isSpacebarPressed) {
      startFluoro()
    }
  }

  function startFluoro() {
    const interval = 1000 / frameRate

    function runFluoro() {
      if (!isSpacebarPressed) return

      // Generate the new frame
      const imageWithMottle = createNewImageWithMottle()
      const timestamp = Date.now()

      // Store the frame in the queue along with its timestamp
      frameQueue.push({ imageWithMottle, timestamp })

      // Render frames from the queue if they meet the latency requirement
      renderDelayedFrames()

      // Continue to the next frame at the end of the defined frame rate
      setTimeout(runFluoro, interval)
    }

    runFluoro()

    //const initialImage = createNewImageWithMottle()
    //ctx.putImageData(initialImage, 0, 0)
    //
    //const interval = 1000 / frameRate
    //fluoro = setInterval(async () => {
    //	await new Promise((resolve) => setTimeout(resolve, latency))
    //	const imageWithMottle = createNewImageWithMottle()
    //	const recursiveImage = applyEMAFilter(imageWithMottle)
    //	ctx.putImageData(recursiveImage, 0, 0)
    //}, interval)
  }

  function renderDelayedFrames() {
    const now = Date.now()

    // Check each frame in the queue to see if its timestamp is older than the latency period
    while (frameQueue.length > 0 && now - frameQueue[0].timestamp >= latency) {
      const frame = frameQueue.shift() // Get the oldest frame that meets the latency requirements

      // Apply recursive filter if enabled and render the frame
      const recursiveImage = applyEMAFilter(frame.imageWithMottle)
      ctx.putImageData(recursiveImage, 0, 0)
    }
  }

  function stopFluoro() {
    isSpacebarPressed = false
    frameQueue = []

    //if (fluoro) {
    //	clearInterval(fluoro)
    //}
  }

  function createNewImageWithMottle() {
    const image = new ImageData(new Uint8ClampedArray(originalImage.data), 512, 512)
    const imageWithCursor = drawCursor(image)
    const imageWithMottle = mottle.addToImage(imageWithCursor, sd)
    return imageWithMottle
  }

  function drawCursor(image) {
    const osCanvas = new OffscreenCanvas(512, 512)
    osCanvas.width = 512
    osCanvas.height = 512
    const osCtx = osCanvas.getContext('2d')
    osCtx.putImageData(image, 0, 0)

    osCtx.fillStyle = '#000000aa'
    osCtx.fillRect(cursorX, cursorY, 50, 50)

    const imageWithCursor = osCtx.getImageData(0, 0, 512, 512)
    return imageWithCursor
  }

  function applyEMAFilter(image) {
    if (!recursiveFilter) return image

    const previousImage = ctx.getImageData(0, 0, 512, 512)

    const filteredImage = image.data.map((pixel, index) => {
      return alpha * pixel + (1 - alpha) * previousImage.data[index]
    })

    const imageData = new ImageData(new Uint8ClampedArray(filteredImage), 512, 512)
    return imageData
  }
</script>

<div class="hidden">
  <img src={testpattern} alt="testpattern" id="testpattern" />
</div>

<canvas id="canvasMain"></canvas>
<div class="controls">
  <div>
    <label for="frameRate">Frame Rate</label>
    <input type="number" id="frameRate" name="frameRate" min="1" max="16" step="1" value="4" />
  </div>
  <div>
    <label for="dose">Arbitrary Dose Value</label>
    <input type="number" id="dose" name="dose" min="10" max="90" step="5" value="50" />
  </div>
  <div>
    <label for="alpha">Recursive Filter</label>
    <input type="number" id="alpha" name="alpha" min="0.1" max="1" step="0.05" value="0.25" />
  </div>
  <div>
    <label for="latency">Latency</label>
    <input type="number" id="latency" name="latency" min="0" max="10000" step="10" value="0" />
  </div>
</div>

<style>
  canvas {
    width: 512px;
    height: 512px;
    border: 1px solid grey;
    cursor: none;
  }

  #frameRate {
    color: white;
  }

  .hidden {
    display: none;
  }
</style>
