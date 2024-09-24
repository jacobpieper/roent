<script>
  import Conrad from '$lib/conrad/conrad'
  import { onMount } from 'svelte'
  import Simulation from '../../../lib/components/Simulation.svelte'

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

    const sim2d = conrad.addImageSim(canvases[0])
    const sim2d2 = conrad.addImageSim(canvases[1])

    const image0 = sim2d.imageObjects.bone
  })
</script>

<Simulation {canvases} />
