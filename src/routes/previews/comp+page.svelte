<script>
  import BitmapLoader from '$lib/conrad/utils/bitmapLoader.js'
  import BlendModes from '$lib/conrad/utils/blendModes.js'
  import { onMount } from 'svelte'

  onMount(() => {
    const fileDirectory = './previews/blendModes/'
    const imageNames = [{ name: 'noise' }, { name: 'cross' }]

    const images = []

    const bitmapLoader = new BitmapLoader(fileDirectory, imageNames)

    bitmapLoader.loadImages().then(() => {
      imageNames.forEach((imageObj) => {
        images.push({
          name: imageObj.name,
          imageData: bitmapLoader.returnImage(imageObj.name),
        })
      })

      const ctx1 = getCtx('canvas1')
      const ctx2 = getCtx('canvas2')
      const ctx3 = getCtx('canvas3')

      const blendedImage = BlendModes.addition(images[0].imageData, images[1].imageData)

      loadImageToCanvas(images[0].imageData, ctx1)
      loadImageToCanvas(images[1].imageData, ctx2)
      loadImageToCanvas(blendedImage, ctx3)
    })

    function getCtx(canvasId) {
      const canvas = document.getElementById(canvasId)
      canvas.width = 8
      canvas.height = 8
      return canvas.getContext('2d')
    }

    function loadImageToCanvas(image, ctx) {
      ctx.putImageData(image, 0, 0)
    }
  })
</script>

<div>
  <canvas id="canvas1"></canvas>
  <input type="checkbox" id="canvas1Inverse" />
</div>
<div>
  <canvas id="canvas2"></canvas>
  <input type="checkbox" id="canvas2Inverse" />
</div>
<div>
  <canvas id="canvas3"></canvas>
  <input type="checkbox" id="canvas3Inverse" />
</div>
