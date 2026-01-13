<!--********************************** SCRIPT PART **********************************-->
<script>
  // Import des icônes
  import Icon from "@iconify/svelte";
  // Import clés API temporaire
  import { apiKey } from "./state.svelte.js";
  import { online } from "svelte/reactivity/window";

  // VARIABLES
  let userPrompt = $state("");
  const userHistoryPrompt = [];
  const aiHistoryPrompt = [];

  // ENVOI DES PROMPT
  const handleSentPrompt = async () => {
    console.log("message envoyé:", userPrompt);
    const msg = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${apiKey.id}`,
      },
      body: JSON.stringify({
        messages: [
          {
            content: userPrompt,
            role: "user",
          },
        ],
        model: "mistral-large-latest",
      }),
    });
    const response = await msg.json();
    const aiResponse = response.choices[0].message.content;
    console.log("reponse du bot:", aiResponse);

    //STOCKAGE DES PROMPTS ET AFFICHAGE
    userHistoryPrompt.push(userPrompt);
    console.log("Histroqique User:", userHistoryPrompt);

    aiHistoryPrompt.push(aiResponse);
    console.log("Histroqique AI:", aiHistoryPrompt);
  };
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
  <!-- <h1>
    Commence une conversation avec
    <em>O'Chat AI</em>
    <Icon icon="gravity-ui:geo-fill" id="appIcon" />
  </h1>

  <form action="">
    <label for="ask-question-hp"></label>
    <textarea name="" id="ask-question-hp" placeholder="Poser une question..."
    ></textarea>
    <button type="submit">Envoyer</button>
  </form> -->

  <section class="chat-section">
    <article class="user-msg">
      <p>Peux tu m'expliquer Svlete ?</p>
      <time datetime="2025-06-13">13 juin 2025 </time>
    </article>

    <article class="ai-msg">
      <p>Biensure !</p>
      <time datetime="2025-06-13">13 juin 2025 </time>
    </article>

    <section class="promt-section">
      <form action="">
        <label for="ask-question-hp"></label>
        <textarea
          name=""
          id="ask-question-hp"
          placeholder="Poser une question..."
          bind:value={userPrompt}
        >
        </textarea>
        <button type="button" onclick={handleSentPrompt}>Envoyer</button>
      </form>
    </section>
  </section>
</main>

<!--*************** ASIDE PART ***************-->

<aside>
  <section id="conv-nav" class="responsive-hidden">
    <button type="button"
      ><Icon icon="gravity-ui:plus" width="1rem" height="1rem" />Nouveau Chat</button
    >
  </section>
  <section id="history-nav">
    <h2>Historique</h2>
    <label class="history-search">
      <input type="text" name="" id="history-search" placeholder="Rechercher" />
      <button type="button" class="search-btn"
        ><Icon
          class="search-icon"
          icon="gravity-ui:magnifier"
          width="1.5rem"
          height="1.5rem"
        /></button
      ></label
    >
  </section>
  <section id="history-content">
    <article class="conv-card">
      <button type="button" class="conv-menu-btn">
        <h3>Lorem ipsum dolor...</h3>
        <Icon
          class="search-icon"
          icon="gravity-ui:ellipsis"
          width="1.5rem"
          height="1.5rem"
        />
      </button>
      <p class="responsive-hidden">
        Explicabo nam officia in, illum ad quae. Id enim ut illum adipisci non
        quibusdam sint animi obcaecati sed quas. Eveniet, in porro!
      </p>
      <time class="responsive-hidden" datetime="2026-01-12"
        >12 janvier 2026</time
      >
    </article>

    <article class="conv-card">
      <button type="button" class="conv-menu-btn">
        <h3>Lorem ipsum dolor...</h3>
        <Icon
          class="search-icon"
          icon="gravity-ui:ellipsis"
          width="1.5rem"
          height="1.5rem"
        />
      </button>
      <p class="responsive-hidden">
        Explicabo nam officia in, illum ad quae. Id enim ut illum adipisci non
        quibusdam sint animi obcaecati sed quas. Eveniet, in porro! Explicabo
        nam officia in, illum ad quae. Id enim ut illum adipisci non quibusdam
        sint animi obcaecati sed quas. Eveniet, in porro!
      </p>
      <time class="responsive-hidden" datetime="2026-01-12"
        >12 janvier 2026</time
      >
    </article>

    <article class="conv-card">
      <button type="button" class="conv-menu-btn">
        <h3>Lorem ipsum dolor...</h3>
        <Icon
          class="search-icon"
          icon="gravity-ui:ellipsis"
          width="1.5rem"
          height="1.5rem"
        />
      </button>
      <p class="responsive-hidden">
        Explicabo nam officia in, illum ad quae. Id enim ut illum adipisci non
        quibusdam sint animi obcaecati sed quas. Eveniet, in porro! Explicabo
        nam officia in, illum ad quae. Id enim ut illum adipisci non quibusdam
        sint animi obcaecati sed quas. Eveniet, in porro!
      </p>
      <time class="responsive-hidden" datetime="2026-01-12"
        >12 janvier 2026</time
      >
    </article>

    <article class="conv-card">
      <button type="button" class="conv-menu-btn">
        <h3>Lorem ipsum dolor...</h3>
        <Icon
          class="search-icon"
          icon="gravity-ui:ellipsis"
          width="1.5rem"
          height="1.5rem"
        />
      </button>
      <p class="responsive-hidden">
        Explicabo nam officia in, illum ad quae. Id enim ut illum adipisci non
        quibusdam sint animi obcaecati sed quas. Eveniet, in porro! Explicabo
        nam officia in, illum ad quae. Id enim ut illum adipisci non quibusdam
        sint animi obcaecati sed quas. Eveniet, in porro!
      </p>
      <time class="responsive-hidden" datetime="2026-01-12"
        >12 janvier 2026</time
      >
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
    header .responsive-hidden {
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

  .chat-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: scroll;
    max-height: 70vh;
  }
  .user-msg {
    color: var(--primarycolor);
    border-top: rgb(180, 180, 180) 1px solid;
    padding: 0.5rem 0.5rem 0rem 0.5rem;
    text-align: right;
  }

  .ai-msg {
    border-top: rgb(180, 180, 180) 1px solid;
    padding: 0.5rem 0.5rem 0rem 0.5rem;
  }

  /* main form {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 0.2rem;
  } */

  #ask-question-hp {
    width: 80%;
  }

  .promt-section form {
    display: flex;
    justify-content: space-evenly;
    align-items: flex-end;
    gap: 0.2rem;
  }

  @media screen and (min-width: 768px) {
    main {
      max-width: 80vw;
      margin: auto;
    }
  }

  @media screen and (min-width: 1024px) {
    main {
      position: absolute;
      left: 20vw;
      width: 100%;
      padding: 0 15rem;
      margin: auto;
    }
  }

  /* *************** ASIDE PART *************** */
  aside {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  #history-nav {
    display: flex;
    gap: 0.2rem;
    justify-content: space-between;
    align-items: center;
  }

  .history-search {
    display: flex;
  }
  #history-search {
    max-width: 45vw;
  }

  #history-content {
    display: flex;
    flex-direction: column;
    padding: 1rem 0;
    gap: 0.5rem;
  }

  .conv-card {
    display: flex;
    flex-direction: column;
    border: solid 1px rgb(180, 180, 180);
    border-radius: 2rem;
    padding: 0 0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .conv-menu-btn {
    display: flex;
    padding: 1rem;
    justify-content: space-between;
    border-radius: 2rem;
  }

  h3 {
    color: var(--primarycolor);
  }

  @media screen and (min-width: 768px) {
    aside section {
      max-width: 80vw;
      margin: auto;
    }

    #history-nav {
      width: 80vw;
    }

    #history-search {
      width: 40vw;
    }

    #history-content {
      width: 80vw;
      display: grid;
      grid-template-columns: repeat(2, 1fr);

      .responsive-hidden {
        display: initial;
      }
    }
    .conv-card {
      max-height: 13rem;
      justify-content: space-between;
    }

    p {
      padding: 0 1rem;
      overflow: scroll;
    }

    time {
      color: rgb(130, 130, 130);
      padding: 0.5rem 1rem;
    }
  }

  @media screen and (min-width: 1024px) {
    .responsive-hidden {
      display: block;
    }

    aside {
      position: absolute;
      top: 2.5rem;
      width: 20vw;
      overflow: scroll;
    }

    #conv-nav button {
      display: flex;
      align-items: center;
      padding: 0.5rem 1.2rem;
      gap: 0.5rem;
      background-color: var(--primarycolor);
      color: var(--lightcolor);
    }

    #history-nav {
      margin: 1rem 0;
      padding: 1rem 0;
      display: initial;
      height: 8rem;
      width: 100%;
    }

    #history-search {
      width: 90%;
    }

    #history-content {
      width: 100%;
      height: 100vh;
      display: flex;
      flex-direction: column;
    }

    #history-content .responsive-hidden {
      display: none;
    }

    .conv-card {
      h3 {
        max-height: 2rem;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
</style>
