<!--********************************** SCRIPT PART **********************************-->
<script>
  // Import des icônes
  import Icon from "@iconify/svelte";
  // Import clés API temporaire :
  // import { apiKey } from "./state.svelte.js";
  import { onMount } from "svelte";
  // Import style makdown
  import Markdown from "svelte-exmarkdown";
  // Import pour gestion du scroll
  import { tick } from "svelte";

  // VARIABLES
  let userPrompt = $state("");
  let userLog = $state("");
  let msgDisplay = $state();
  let backEndHistoryPrompt = $state([]);
  let isLoading = $state(true);
  let isHidden = $state(false);
  let notHidden = $state(true);
  let backEndHistoryChat = $state([]);
  let convActuelle = $state();

  // AFFICHAGE DES DONNES BACKEND DANS CHAT
  handleHistory();

  // ENVOI DES PROMPT
  const handleSentPrompt = async (e) => {
    e.preventDefault();

    convActuelle = backEndHistoryPrompt[0].conv_relation;

    console.log("recup id convactuelle: ", convActuelle);

    isLoading = true;

    // CONTROL ID  USER ET ENVOI DU PROMPT A MISTRAL
    userLog = localStorage.getItem("id");
    const msg = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // Authorization: `Bearer ${apiKey.id}`,
        // Ci dessus la version initiale avant usage du local storage
        Authorization: `Bearer ${userLog}`,
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
    // VERIFICATION ID OK
    const response = await msg.json();
    if (response.detail === "Unauthorized") {
      dialog.showModal();
    }
    const aiResponse = response.choices[0].message.content;

    // STOCKAGE PROMPT EN BACKEND

    const saveCurrentMsg = await fetch(
      "http://127.0.0.1:8090/api/collections/chat_history/records",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: userPrompt,
          role: "user",
          conv_relation: convActuelle,
        }),
      }
    );
    const responsPrompt = await saveCurrentMsg.json();

    backEndHistoryPrompt.push(responsPrompt);

    userPrompt = "";

    // STOCKAGE REPONSE IA EN BACKEND
    const saveAitMsg = await fetch(
      "http://127.0.0.1:8090/api/collections/chat_history/records",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: aiResponse,
          role: "O'Chat",
          conv_relation: convActuelle,
        }),
      }
    );
    const responsAi = await saveAitMsg.json();
    backEndHistoryPrompt.push(responsAi);
    isLoading = false;

    // Gestion du scroll pour etre toujours en bas de la conversation
    await tick();
    msgDisplay.scrollTop = msgDisplay.scrollHeight;
    isLoading = false;
    return id;
  };

  // MODAL DU LOG INITIAL
  let dialog = $state();
  let userToken = $state("");

  const handleSumbmit = async (e) => {
    e.preventDefault();
    localStorage.setItem("id", userToken);
    // Gestion de l'ID de l'utilisateur
    userLog = localStorage.getItem("id");
    const msg = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${userLog}`,
      },
    });
    const response = await msg.json();
    if (response.detail === "Unauthorized") {
      localStorage.removeItem("id");
      alert(
        `Clé non valide, créez en une, c'est gratuit! \n\nPlus d'infos sur : shttps://docs.mistral.ai/getting-started/quickstart`
      );
      userToken = "";
    } else {
      userToken = "";
      dialog.close();
    }
  };

  // DISPLAY MODAL SI PAS ID VALID AU LOGGIN
  async function handleLoggin() {
    if (localStorage.getItem("id") === null) {
      dialog.showModal();
    } else {
      // AFFICHAGE DES DONNES BACKEND
      //   handleHistory(); /////////////////////////////// < C'est ici que je devrais remettre la version HP du chat vierge non intégré pour le moment
      handleChatHistory();
      isHidden = true;
      notHidden = false;
    }
  }

  // FONCTION NEW CHAT
  let subjetcNewChat = $state();
  async function createNewChat(e) {
    e.preventDefault();

    if (localStorage.getItem("id") === null) {
      dialog.showModal();
    } else {
      const newChat = await fetch(
        "http://127.0.0.1:8090/api/collections/conv_history/records",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: "",
            title: subjetcNewChat,
          }),
        }
      );
      const response = await newChat.json();
      console.log(response);
      handleHistory(response.id);

      //ENVOI D4UN MSG VIDE
      const createAitMsg = await fetch(
        "http://127.0.0.1:8090/api/collections/chat_history/records",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: "Pose une question",
            role: "O'Chat",
            conv_relation: response.id,
          }),
        }
      );
      const responsAi = await createAitMsg.json();
      backEndHistoryPrompt.push(responsAi);
    }
  }

  // AFFICHAGE DES CONVESRATION EN MEMOIRE
  async function handleChatHistory() {
    const historyCurrentChat = await fetch(
      "http://127.0.0.1:8090/api/collections/conv_history/records",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const backEndChatResponse = await historyCurrentChat.json();
    backEndHistoryChat = backEndChatResponse.items;
  }

  // FONCTION POUR AFFICHER HISTORIQUE DU CHAT
  async function handleHistory(id) {
    isLoading = true;
    // Affiche la vue conversation et masque la Homepage
    isHidden = false;
    notHidden = true;

    const historyCurrentMsg = await fetch(
      `http://127.0.0.1:8090/api/collections/chat_history/records`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const backEndHistResponse = await historyCurrentMsg.json();
    console.log("vue des donée", backEndHistResponse);
    backEndHistoryPrompt = [];
    for (let item of backEndHistResponse.items) {
      if (item.conv_relation === id) {
        backEndHistoryPrompt.push(item);
      }
    }

    // Gestion du scroll pour etre toujours en bas de la conversation
    await tick();
    msgDisplay.scrollTop = msgDisplay.scrollHeight;
    isLoading = false;
    return id;
  }

  onMount(handleLoggin);
</script>

<!--********************************** HTML PART **********************************-->
<!--*************** HEADER PART ***************-->

<header>
  <nav>
    <button type="button" class="notWork">
      <Icon icon="gravity-ui:arrow-left-to-line" width="1rem" height="1rem" />
      <span class="responsive-hidden">Reduire</span>
    </button>
    <button type="button" class="notWork">
      <Icon icon="gravity-ui:person-gear" width="1rem" height="1rem" />
      <span class="responsive-hidden">Profil & Réglages</span>
    </button>
  </nav>
</header>

<!--*************** MAIN PART ***************-->

<main>
  <!-- TODO A VOIR PLUS TARD COMMENT GERER AFFICHAGE BLOC WELCOME -->
  <section class="bloc-welcome hidden" class:hidden={notHidden}>
    <h1>
      Commence une conversation avec
      <em>O'Chat AI</em>
      <Icon icon="gravity-ui:geo-fill" id="appIcon" />
    </h1>
    <form action="">
      <label for="ask-question-hp"></label>
      <textarea
        name=""
        id="ask-question-hp"
        placeholder="Nomme cette nouvelle conversation"
      ></textarea>
      <button type="submit">Envoyer</button>
    </form>
  </section>

  <!--****** MODAL DE LOGIN ******-->

  <dialog bind:this={dialog}>
    <form action="" onsubmit={handleSumbmit}>
      <label for="tokenMistral"
        >Entrez une clé API / Token Mistral valide :</label
      >
      <input
        type="text"
        name=""
        id="tokenMistral"
        required
        bind:value={userToken}
      />
      <button type="submit"> Valider </button>
    </form>
  </dialog>

  <!--****** HISTORY CHAT ******-->

  <section class="chat-section" bind:this={msgDisplay}>
    {#each backEndHistoryPrompt as message}
      {#if message.role === "user"}
        <article class="user-msg">
          <p><Markdown md={message.content} /></p>
          <Icon
            icon="gravity-ui:person-pencil"
            width="1rem"
            height="1rem"
            class="chatIcones"
          />
        </article>
      {:else if message.role === "O'Chat"}
        <article class="ai-msg">
          <Icon icon="gravity-ui:geo-fill" class="chatIcones" />
          <p><Markdown md={message.content} /></p>
        </article>
      {/if}
    {/each}
  </section>

  <!--****** PROMPT ******-->
  <section class="promt-section" class:hidden={isHidden}>
    {#if isLoading}
      <Icon icon="svg-spinners:3-dots-bounce" id="chatWait" width="2rem" />{/if}
    <form action="" onsubmit={handleSentPrompt}>
      <label for="ask-question-hp"></label>
      <textarea
        name=""
        id="ask-question-hp"
        placeholder="Poser une question..."
        bind:value={userPrompt}
      >
      </textarea>
      <button type="submit">Envoyer</button>
    </form>
  </section>
</main>

<!--*************** ASIDE PART ***************-->

<aside>
  <section id="conv-nav" class="responsive-hidden">
    <form onsubmit={createNewChat}>
      <label for="subjectNewChat"></label>
      <input
        type="text"
        name=""
        id="subjectNewChat"
        placeholder="Sujet du nouveau Chat"
        bind:value={subjetcNewChat}
      />
      <button type="submit">
        <Icon icon="gravity-ui:plus" width="1rem" height="1rem" />
        Nouveau Chat</button
      >
    </form>
  </section>
  <section id="history-nav" class="notWork">
    <h2>Historique</h2>
    <label class="history-search">
      <input
        type="text"
        name=""
        id="history-search"
        placeholder="Rechercher"
        class="notWork"
      />
      <button type="button" class="search-btn notWork"
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
    {#each backEndHistoryChat as chat}
      <article class="conv-card">
        <button
          type="button"
          class="conv-menu-btn"
          onclick={() => {
            handleHistory(chat.id);
          }}
        >
          <h3>{chat.title}</h3>
          <Icon
            class="search-icon notWork"
            icon="gravity-ui:ellipsis"
            width="1.5rem"
            height="1.5rem"
          />
        </button>
      </article>
    {/each}
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
  /* *********** MODAL LOGGIN PART *********** */
  dialog {
    border: none;
  }
  dialog::backdrop {
    background: rgba(0, 0, 0, 0.5);
  }

  dialog form {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    gap: 1rem;
  }
  /* *************** MAIN PART *************** */
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem;
    gap: 1rem;
    height: 85vh;
    margin: auto;
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

  .user-msg,
  .ai-msg {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: baseline;
    padding-top: 1rem;
  }

  .user-msg {
    color: var(--primarycolor);
    border-top: rgb(180, 180, 180) 1px solid;
  }

  .ai-msg {
    border-top: rgb(180, 180, 180) 1px solid;
    justify-content: flex-start;
  }

  main form {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 0.2rem;
  }

  #ask-question-hp {
    width: 100%;
  }

  .promt-section form {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    gap: 0.2rem;
    margin: 0.5rem;
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
      padding: 1rem 10%;
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
    overflow: scroll;
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
      height: 100vh;
      background-color: var(--bgcolor);
      display: block;
    }

    aside section {
      position: absolute;
    }

    #conv-nav {
      top: 3rem;
      padding-bottom: 3rem;
      border-bottom: solid rgb(180, 180, 180) 1px;
    }

    #conv-nav form {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }

    #conv-nav button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background-color: var(--primarycolor);
      color: var(--lightcolor);
      padding: 0.5rem 1.2rem 0.5rem 0.5rem;
    }

    #history-nav {
      top: 12.5rem;
      position: relative;
      margin: 5rem 0;
      padding: 2rem 0;
      display: initial;
      height: 8rem;
      width: 100%;
      flex-direction: column;
      justify-content: flex-end;
      align-items: flex-end;
    }

    #history-search {
      width: 90%;
    }

    #history-content {
      top: 19.5rem;
      width: 97%;
      display: flex;
      flex-direction: column;
    }

    #history-content .responsive-hidden {
      display: none;
    }

    .conv-card {
      width: 90%;
      h3 {
        max-height: 2rem;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
</style>
