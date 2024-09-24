<script>
  import { onMount } from 'svelte'

  import BitmapLoader from '$lib/conrad/utils/bitmapLoader'
  import BlendModes from '$lib/conrad/utils/blendModes'

  onMount(() => {
    const fileDirectory = '/previews/blendModes/'
    const imageNames = [{ name: 'noise' }, { name: 'cross' }]

    const images = []

    const loader = new BitmapLoader(fileDirectory, imageNames)
    loader.loadImages().then(() => {
      imageNames.forEach((imageObj) => {
        images.push({
          name: imageObj.name,
          imageData: loader.returnImage(imageObj.name),
        })
      })

      const blendedImage = BlendModes.subtraction(images[0].imageData, images[1].imageData)
    })
  })
</script>
