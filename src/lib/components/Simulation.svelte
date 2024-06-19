<script>
  export let canvases
</script>

<main>
  {#each canvases as canvas}
    <canvas id={canvas.id} style="width: {canvas.width}; height: {canvas.height};"></canvas>
  {/each}
</main>

<style>
  main {
    height: calc(100% - 6px);
  }
</style>
