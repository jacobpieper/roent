<script>
  export let lists

  /**
   * Status'/statuses/stati?
   *   -todo: do not render link
   *   -active: render link
   *   -depricated: render link with strike through
   */
</script>

<div class="sidebar-container">
  <aside>
    <nav>
      <!--Iterate each list in lists-->
      {#each lists as list}
        <div class="list-container">
          <h1 class="h1-nav">{list.title}</h1>
          <ul>
            <!--If list contains links, iterate and render links-->
            {#if list.items !== undefined}
              {#each list.items as item}
                <!--Check item status-->
                {#if item.status === 'active'}
                  <li><a href={item.path}><h3 class="h3-nav">{item.name}</h3></a></li>
                {:else if item.status === 'depricated'}
                  <li><a href={item.path}><h3 class="h3-nav depricated">{item.name}</h3></a></li>
                {/if}
              {/each}
            {/if}

            <!--If list contains sublists, iterate sublists-->
            {#if list.sublists !== undefined}
              {#each list.sublists as sublist}
                <div class="sublist-container">
                  <h2 class="h2-nav">{sublist.title}</h2>
                  <ul>
                    <!--If sublist contains links, iterate and render links-->
                    {#if sublist.items !== undefined}
                      {#each sublist.items as item}
                        <!--Check item status-->
                        {#if item.status === 'active'}
                          <li><a href={item.path}><h3 class="h3-nav">{item.name}</h3></a></li>
                        {:else if item.status === 'depricated'}
                          <li>
                            <a href={item.path}><h3 class="h3-nav depricated">{item.name}</h3></a>
                          </li>
                        {/if}
                      {/each}
                    {/if}
                  </ul>
                </div>
              {/each}
            {/if}
          </ul>
        </div>
      {/each}
    </nav>
  </aside>
</div>

<style>
  .sidebar-container {
    width: 480px;
    height: 100%;
  }

  aside {
    height: 100%;
    padding-left: 50px;
    padding-right: 20px;
    border-right: 1px solid #777777;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: inherit;
  }

  .h1-nav {
    color: var(--color-accent1);
    font-size: 1.4em;
    font-weight: 700;
    font-variant: small-caps;
    padding-bottom: 0.5em;
  }

  .h2-nav {
    color: var(--color-fg1);
    font-size: 1.3em;
    font-weight: 700;
    padding-bottom: 0.25em;
  }

  .h3-nav {
    color: var(--color-fg2);
    font-weight: 100;
    font-size: 1.2em;
    padding-bottom: 0.25em;
  }

  .list-container {
    padding-top: 1em;
    padding-bottom: 1em;
  }

  .sublist-container {
    padding-bottom: 1em;
  }

  .depricated {
    text-decoration: line-through;
  }
</style>
