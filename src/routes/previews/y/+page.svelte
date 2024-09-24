<script>
  import { onMount } from 'svelte'
  import ImageObject from '$lib/conrad/imageObject/imageObject'

  const data = [100, 100, 100, 255, 110, 110, 110, 255, 200, 200, 200, 255, 20, 20, 20, 255]

  onMount(() => {
    const imageData = new ImageData(new Uint8ClampedArray(data), 2, 2)

    const canvas = document.getElementById('canvasTest')
    canvas.width = 2
    canvas.height = 2
    const ctx = canvas.getContext('2d')
    ctx.putImageData(imageData, 0, 0)

    const imageObject = new ImageObject(imageData)
    imageObject.applyWindowing(127, 99)
    const imageData2 = imageObject.getImageData(0, 0, 2, 2)

    const canvas2 = document.getElementById('canvasTest2')
    canvas2.width = 2
    canvas2.height = 2
    const ctx2 = canvas2.getContext('2d')
    ctx2.putImageData(imageData2, 0, 0)
  })
</script>

<canvas id="canvasTest"></canvas>
<canvas id="canvasTest2"></canvas>
