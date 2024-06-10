<script>
  import Sidebar from '../../lib/components/Sidebar.svelte'
</script>

<div class="body-container">
  <Sidebar />
  <div class="preview-container">
    <slot />
  </div>
</div>

<style>
  .body-container {
    display: flex;
    align-items: center;
  }

  .preview-container {
    width: 100%;
    height: 100%;
  }
</style>
