<script>
  import Copyright from '../../lib/components/Copyright.svelte'
  import Header from '../../lib/components/Header.svelte'
  import Sidebar from '../../lib/components/Sidebar.svelte'

  const lists = [
    {
      title: 'Components',
      sublists: [
        {
          title: 'Threejs/WebGL',
          items: [
            {
              name: 'Dynamic Beam',
              path: '/previews/component/dynamic-beam',
              status: 'active',
            },
            {
              name: 'Model / General Room',
              path: '/previews/component/image-compositor',
              status: 'todo',
            },
            {
              name: 'Model / C-Arm',
              path: '/previews/component/xray-spectrum',
              status: 'todo',
            },
          ],
        },
        {
          title: 'Compositor',
          items: [
            {
              name: 'Layer Blending',
              path: '/previews/component/layer-blending',
              status: 'todo',
            },
            {
              name: 'Layer Interpolation',
              path: '/previews/component/layer-interpolation',
              status: 'todo',
            },
            {
              name: 'Live Dynamic Inputs',
              path: '/previews/component/live-dynamic-inputs',
              status: 'todo',
            },
            {
              name: 'Loader / Bitmap',
              path: '/previews/component/loader-bitmap',
              status: 'todo',
            },
          ],
        },
        {
          title: 'X-ray Spectrum',
          items: [
            {
              name: 'TASMIP',
              path: '/previews/component/tasmip',
              status: 'todo',
            },
            {
              name: 'Mass Attenuation Coefficients',
              path: '/previews/component/mass-attenuation-coefficients',
              status: 'todo',
            },
          ],
        },
      ],
    },
    {
      title: 'Simulations',
      items: [
        {
          name: 'General X-ray 3D',
          path: '/previews/simulation/general-xray',
          status: 'todo',
        },
        {
          name: 'Inverse Square Law',
          path: '/previews/simulation/inverse-square-law',
          status: 'todo',
        },
        {
          name: 'Fluoroscopic Imaging',
          path: '/previews/simulation/fluoroscopy',
          status: 'todo',
        },
        {
          name: 'Digital Subtraction Imaging',
          path: '/previews/digital-subtraction',
          status: 'todo',
        },
        {
          name: 'Sampled X-ray Spectrum',
          path: '/previews/sampled-xray-spectrum',
          status: 'todo',
        },
        {
          name: 'Contrast Flow',
          path: '/previews/contrast-flow',
          status: 'todo',
        },
      ],
    },
  ]
</script>

<Header pathName="previews" />
<div id="body-container">
  <Sidebar {lists} />
  <div id="simulation-container">
    <slot />
    <div id="parameters"></div>
  </div>
</div>
<Copyright />

<style>
  * {
    background: inherit;
  }

  #body-container {
    width: 100vw;
    height: calc(100vh - 61px);
    display: flex;
  }

  #simulation-container {
    background: #000000;
    width: 100%;
  }

  #parameters {
    position: absolute;
    top: 61px;
    right: 0px;
  }
</style>
