<script>
  import * as THREE from 'three'
  import Conrad from '$lib/conrad/conrad'
  import { onMount } from 'svelte'
  import Simulation from '../../../lib/components/Simulation.svelte'
  import ImageBlender from '$lib/conrad/imageSim/imageBlender'

  const canvases = [
    {
      id: 'canvas0',
      width: 512,
      height: 512,
    },
    {
      id: 'canvas1',
      width: 512,
      height: 512,
    },
  ]

  const sources = [
    // Bitmaps
    {
      name: 'bone',
      type: 'imageBitmap',
      path: '/previews/fluoroscopy/bone.bmp',
    },
    {
      name: 'softTissue',
      type: 'imageBitmap',
      path: '/previews/fluoroscopy/softTissue.bmp',
    },
  ]

  onMount(() => {
    const conrad = new Conrad(canvases, sources)
    const sim3d = conrad.add3DSim(canvases[0])

    const grid = new THREE.GridHelper(150, 15)
    sim3d.scene.add(grid)

    const sim2d = conrad.addImageSim(canvases[1])

    const image0 = sim2d.imageObjects.bone
    const image1 = sim2d.imageObjects.softTissue
    console.log(image0)
    const imageBlender = new ImageBlender()

    //! 2D
    //const arr = new Uint8ClampedArray(64 * 64 * 4)
    //for (let i = 0; i < arr.length; i += 4) {
    //  arr[i + 0] = 0 // R value
    //  arr[i + 1] = 190 // G value
    //  arr[i + 2] = (i % 64) * 5 // B value
    //  arr[i + 3] = 255 // A value
    //}
    //
    //let imageData = new ImageData(arr, 64)
    //
    //const sim2d = conrad.addImageSim(canvases[1])
    //sim2d.renderImageData(imageData)
  })
</script>

<Simulation {canvases} />
