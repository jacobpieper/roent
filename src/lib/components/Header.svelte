<script>
  import Logo from './svg/Logo.svelte'
  import Github from './svg/github.svelte'

  export let pathName

  if (!pathName) {
    // If no path name is 'undefined' set to empty string instead
    pathName = ``
  }
</script>

<header>
  <div class="logo-container">
    <Logo width={100} height={60} color={'#f2f2f2'} />
    <h1 class="path-name">{pathName}</h1>
  </div>
  <div class="nav-container">
    <Github width={40} height={40} color={'#f2f2f2'} />
  </div>
</header>

<style>
  header {
    width: 100vw;
    height: 60px;
    border-bottom: 1px solid #777777;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .nav-container {
    padding-right: 150px;
    padding-top: 5px;
  }

  .logo-container {
    width: fit-content;
    height: 60px;
    padding-left: 50px;
    display: flex;
  }

  .path-name {
    padding-top: 14px;
    padding-left: 12px;
    font-size: 1.6em;
    font-weight: 300;
    color: var(--color-fg1);
    font-variant: small-caps;
  }
</style>
