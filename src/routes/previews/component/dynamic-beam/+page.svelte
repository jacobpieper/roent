<script>
  /**
   * What the fuck is causing so much lag all of a sudden.
   */
  import * as THREE from 'three'
  import { onMount } from 'svelte'
  import Simulation from '../../../../lib/components/Simulation.svelte'
  import Conrad from '$lib/conrad/conrad'
  import DivergentBeam from '$lib/conrad/3d/objects/divergentBeam'

  const canvases = [
    {
      id: 'canvas-0',
      width: '100%',
      height: '100%',
    },
  ]

  onMount(() => {
    const conrad = new Conrad()
    const simulation = conrad.addSimulation('3d', canvases[0])

    const grid = new THREE.GridHelper(150, 15)
    simulation.scene.add(grid)

    const beam = new DivergentBeam(simulation)
    simulation.keepUpdated.push(beam)

    simulation.paramsFolder
      .add(beam, 'collimatorX')
      .name('Collimator Width')
      .min(0)
      .max(5)
      .step(0.01)

    simulation.paramsFolder
      .add(beam, 'collimatorZ')
      .name('Collimator Height')
      .min(0)
      .max(5)
      .step(0.01)

    simulation.paramsFolder.add(beam, 'sid').name('SID').min(50).max(300).step(1)
  })
</script>

<Simulation {canvases} />

<style>
</style>
