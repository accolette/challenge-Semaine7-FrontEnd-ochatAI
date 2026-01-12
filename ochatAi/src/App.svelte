<!--********************************** SCRIPT PART **********************************-->
<script>
  // Import des icônes
  import Icon from "@iconify/svelte";
</script>

<!--********************************** HTML PART **********************************-->
<!--*************** HEADER PART ***************-->

<header>
  <nav>
    <button type="button">
      <Icon icon="gravity-ui:arrow-left-to-line" width="1rem" height="1rem" />
      <span class="responsive-hidden">Reduire</span>
    </button>
    <button type="button">
      <Icon icon="gravity-ui:person-gear" width="1rem" height="1rem" />
      <span class="responsive-hidden">Profil & Réglages</span>
    </button>
  </nav>
</header>

<!--*************** MAIN PART ***************-->

<main>
  <h1>
    Commence une conversation avec
    <em>O'Chat AI <Icon icon="gravity-ui:sparkles-fill" id="appIcon" /></em>
  </h1>

  <form action="">
    <label for="ask-question-hp"></label>
    <textarea name="" id="ask-question-hp" placeholder="Poser une question..."
    ></textarea>
    <button type="submit">Envoyer</button>
  </form>
</main>

<!--*************** ASIDE PART ***************-->

<aside>
  <section><button type="button">Nouveau Chat</button></section>
  <section><h2>Historique</h2></section>
  <section>
    <article>
      <button type="button">Options</button>
      <h3>Lorem ipsum dolor, sit amet consectetur</h3>
      <p>
        Explicabo nam officia in, illum ad quae. Id enim ut illum adipisci non
        quibusdam sint animi obcaecati sed quas. Eveniet, in porro!
      </p>
      <time datetime="2026-01-12">12 janvier 2026</time>
    </article>
  </section>
</aside>

<!--********************************** STYLE PART **********************************-->
<style>
  /* *************** HEADER PART *************** */
  header nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 2.5rem;
    padding: 0rem 0.5rem;
  }

  nav button {
    border-radius: 0;
  }

  .responsive-hidden {
    display: none;
  }

  @media screen and (min-width: 768px) {
    .responsive-hidden {
      display: initial;
    }

    header button {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      align-items: center;
      gap: 0.3rem;
    }
  }

  /* *************** MAIN PART *************** */
  main {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding: 1rem;
    gap: 1rem;
    height: 70vh;
  }

  main button {
    background-color: var(--primarycolor);
    color: var(--lightcolor);
    font-weight: 600;
    width: 6rem;
  }

  main form {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 0.2rem;
  }
  #ask-question-hp {
    height: 10vh;
    width: 100%;
  }

  @media screen and (min-width: 768px) {
    main {
      max-width: 80vw;
      margin: auto;
    }
  }

  @media screen and (min-width: 1024px) {
    main {
      max-width: 40vw;
    }
  }
</style>
