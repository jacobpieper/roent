<aside>
  <div class="header">
    <div class="logo-container">
      <img class="roent-logo" src="/roent-white.svg" alt="Roent" />
    </div>
  </div>

  <div class="list-container">
    <div class="feature-list">
      <h2>Features</h2>
      <ul>
        <li><a href="/">Example</a></li>
        <li><a href="/">Example</a></li>
        <li><a href="/">Example</a></li>
      </ul>
    </div>
  </div>
</aside>

<style>
  aside {
    width: 400px;
    height: calc(100vh - 50px);
    border: 2px solid #bababa;
    border-radius: 10px;
    background-color: #090806;
  }

  .header {
    display: flex;
    justify-content: flex-start;
    align-items: end;
    gap: 10px;
    padding-top: 25px;
    padding-bottom: 20px;
    border-bottom: 1px solid #bababa;
    padding-left: 30px;
  }

  .roent-logo {
    width: 100px;
  }

  h1 {
    font-size: 22px;
    color: #bababa;
  }

  .list-container {
    padding-left: 30px;
  }

  h2 {
    font-size: 24px;
    color: #f2f2f2;
    padding-top: 15px;
    padding-bottom: 5px;
  }

  li {
    font-size: 20px;
    color: white;
    padding-left: 20px;
    padding-bottom: 5px;
  }

  ul {
    padding-bottom: 20px;
  }

  a:hover {
    text-shadow: 0px 0px 5px #f2f2f2;
  }
</style>
