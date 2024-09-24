<script>
  import BitmapLoader from '$lib/conrad/utils/bitmapLoader'
  import BlendModes from '$lib/conrad/utils/blendModes'
  import Caster from '$lib/conrad/compositor/caster'
  import { onMount } from 'svelte'

  onMount(() => {
    const fileDirectory = '/previews/fluoroscopy/'
    const images = [{ name: 'softTissue' }] //{ name: 'softTissue' }, { name: 'sma' }]

    const loader = new BitmapLoader(fileDirectory, images)

    loader.loadImages().then(() => {
      images.forEach((image, index) => {
        images[index].imageData = loader.returnImage(image.name)
        images[index].imageObject = loader.getImageObject(image.name)

        const caster = new Caster(4, loader.getImageObject(image.name))
        caster.renderImage(0, 1)
      })

      //const maskImage = BlendModes.addition(images[0].imageData, images[1].imageData)
      //const contrastImage = BlendModes.addition(maskImage, images[2].imageData)
      //
      //const subtractedImage = BlendModes.subtraction(contrastImage, maskImage)
      //
      //const overlayImage = BlendModes.addition(maskImage, subtractedImage)
      //
      //ctx.putImageData(overlayImage, 0, 0)
      //ctx.putImageData(images[0].imageData, 0, 0)
      //ctx.putImageData(images[1].imageData, 0, 0)
    })

    //const canvas = document.getElementById('tt')
    //
    //canvas.width = 256
    //canvas.height = 256
    //
    //const ctx = canvas.getContext('2d')
  })
</script>

<canvas id="tt"></canvas>

<style>
  canvas {
    width: 512px;
    height: 512px;
  }
</style>
