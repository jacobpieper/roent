<script>
  import Conrad from '$lib/conrad/conrad'

  import Detector from '$lib/conrad/objects/detector.js'
  import { onMount } from 'svelte'

  onMount(() => {
    const conrad = new Conrad()
    const testSimulation = conrad.addSimulation('3d')

    const detector = new Detector(testSimulation)
    console.log(conrad)
  })
</script>

<canvas id="myCanvas"></canvas>
slot text
