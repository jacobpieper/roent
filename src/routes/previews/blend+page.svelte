<script>
  import { onMount } from 'svelte'

  import BitmapLoader from '$lib/conrad/utils/bitmapLoader.js'
  import BlendModes from '$lib/conrad/utils/blendModes.js'

  onMount(() => {
    const loader = new BitmapLoader('./', [{ name: 'sample1' }, { name: 'sample2' }])
    loader.loadImages().then(() => {
      const sample1 = loader.returnImage('sample1')
      const sample2 = loader.returnImage('sample2')

      const im = BlendModes.subtraction(sample1, sample2)
      const imin = BlendModes.inverse(im)

      const canvas1 = document.getElementById('one')
      canvas1.width = 8
      canvas1.height = 8
      const ctx1 = canvas1.getContext('2d')
      ctx1.putImageData(sample1, 0, 0)

      const canvas2 = document.getElementById('two')
      canvas2.width = 8
      canvas2.height = 8
      const ctx2 = canvas2.getContext('2d')
      ctx2.putImageData(sample2, 0, 0)

      const canvas3 = document.getElementById('three')
      canvas3.width = 8
      canvas3.height = 8
      const ctx3 = canvas3.getContext('2d')
      ctx3.putImageData(imin, 0, 0)
    })
  })
</script>

<canvas id="one"></canvas>
<canvas id="two"></canvas>
<canvas id="three"></canvas>

slot text 2
