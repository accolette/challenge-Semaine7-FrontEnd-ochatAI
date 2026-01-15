# CARNET DE BORD DU PROJET : O'CHAT AI

## Jour 1 : Wireframe et intégration HTML/CSS dans Svelte

### Todo List :

* [x] Mettre en place le carnet de bord
* [x] Faire une pige de style
* [x] Prépa du fichier pour portfolio
* [x] Relire le cahier des charges
* [x] Créer le wireframe  <font color="green">
 (max 1h30)</font>
* [x] Mettre en place le projet Svelte  <font color="green">
 (30 min)</font>
* [x] Intégrer l'UI en mobile first  <font color="green">
(4h)</font> 


### Bilan de fin de journée
#### Ce que je n'ai pas réussi à faire :

* Gérer l'agrandissement automatique du champ texte de conversation sur les versions mobile et tablette afin qu'il s'agrandisse suivant le texte tapé, puis qu'il se fixe à un max de 4 lignes par exemple.
* Faire toutes les intégrations cliquables du site.

#### Les choix que j'ai faits :

* J'ai passé un peu plus de temps que prévu sur la maquette, bien qu'en ayant utilisé un template.
  Prévu 1h30 max, j'y ai passé 2h30.
  Je pensais être plus rapide sur cet aspect, mais cela m'a permis de comprendre un peu mieux Figma.

* Graphiquement, j'ai un peu adapté le style pendant la phase d'intégration vs les maquettes prévues, parce que plus homogène selon moi au final, et pour essayer de gagner un peu de temps.

#### Ce que tu referais différemment :

* Partir sur vraiment quelque chose de simple et épuré graphiquement pour d'abord mettre en place l'aspect fonctionnel, puis faire le style.

#### Les prochaines étapes si tu avais eu plus de temps :

* Mieux gérer la version desktop.
* Cleaner mon fichier Svelte pour faire des modules pour chaque zone du site.
* Faire toute la partie interactions.

------------------

## Jour 2 : Interaction avec l'IA et réponse aux demandes

### Todo List :

* [x] Todo de la journée avec durées objectivées sur 6 h au total
* [ ] Finir d'intégrer l'UI en mobile first  <font color="green">
(1 h 15)  </font> 
> Sous-tâches sur l'intégration :
* [x] Favicon
* [x] Intégration partie chat
* [ ] Menus cliquables
* [X] Modal de login à l'arrivée
* [ ] Revoir le style du bouton « nouveau chat »
* [ ] Bonus : Dispatcher le fichier en composants   
> Puis :
* [x] Mettre le token dans un fichier dédié et faire immédiatement un .gitignore dessus
* [x] Étape 2 : Lier l'API à Mistral AI  <font color="green">
 (1 h 30)</font>
* [x] Gérer les réponses et erreurs éventuelles
* [x] Étape 3 : Gérer un affichage différencié entre user et IA  <font color="green">
 (1 h 30)</font>
* [x] Nettoyer le système de tableau — étape 3
* [x] Reset du champ de saisie
* [X] Étape 4 : Sécuriser le token Mistral <font color="green">
 (1 h)</font>
* [ ] Bonus : usage eMarkdown  <font color="green">
 (30 min)</font>
* [X] Remplir le carnet de bord  <font color="green">
 (15 min)</font>

### Bilan de fin de journée
#### Ce que j'ai réussi à faire :
* Avancer sur l'intégration manquante de la partie chat
* Lier le tout à l'API de Mistral
* Faire le style du chat pour differentier les messages
* Faire l'usage du tokken sans le faire apparaitre dans le code (enfin sauf erreur de ma part)

#### Ce que je n'ai pas réussi à faire :
* Les zones cliquables du header et de l'historique n'ont pas été traité du tout
* L'affichage de l'heure d'envoi des messages
* Faire en sorte que l'on soit toujours du scroll dans la zone du chat

#### Les choix que j'ai faits :

* J'ai commencé à regarder les interactions, notamment pour réduire la zone d'historique : j'ai abandonné car je perdais trop de temps.

#### Ce que tu referais différemment :

#### Les prochaines étapes si tu avais eu plus de temps :
* Gérer la touche Entrée au clavier pour envoyer le message
* Gérer l'affichage de l'heure d'envoi du message
* Ajouter un symbole de chargement le temps que le serveur réponde
* Faire en sorte que l'on soit toujours du scroll dans la zone du chat
* Gérer des messages d'alerte si le token Mistral n'est pas bon


------------------

## Jour 3 : Persistance des données grâce à Pocketbase

### Todo List :

* [x] Todo de la journée avec durées objectivées sur 6 h au total

> Ce qui n'a pas été fait du J2 :  <font color="green">
 (3h)</font>

* [x] Bonus : usage eMarkdown
* [x] Remettre le fichier state clean mais en full commentaires
* [x] Utiliser du .trim sur les messages
* [ ] Faire un "Entrée" au clavier qui soumet et qui ne renvoie pas à la ligne
* [x] Gérer des messages d'alerte si le token Mistral n'est pas bon
* [x] Faire en sorte que l'on soit toujours en bas du scroll dans la zone du chat
* [x] Faire un loader le temps du chargement du serveur

> Objectifs du J3 :

* [x] Étape 1 : Mettre en place un backend Pocketbase  <font color="green">
(15 min)</font> 
* [x] Étape 2 : Mettre en place les requêtes d'enregistrement  <font color="green">
 (2h)</font>
* [x] Étape 3 : Différencier les messages IA et humain (--)
* [X] Remplir le carnet de bord  <font color="green">
 (15 min)</font>  
> Ce qui n'a pas été fait du J1  <font color="green">
 (30 min) </font>:

* [ ] Menus cliquables
* [ ] Revoir le style du bouton « nouveau chat »
* [ ] Bonus : Dispatcher le fichier en composants

### Bilan de fin de journée

#### Ce que j'ai réussi à faire :

* Gérer le message d'alerte si clé API erronée et bloquer l'accès à la suite tant que l'ID n'est pas valide
* Faire que l'on soit toujours en bas en termes de scroll dans le chat, j'ai réussi avec ChatGPT à qui j'ai demandé des indices, pas la solution immédiate, mais j'ai été fortement guidée là-dessus
* Idem pour faire un loader le temps du chargement de la réponse, avec l'aide de ChatGPT

#### Ce que je n'ai pas réussi à faire :

* Gérer la soumission du prompt avec la touche Entrée
* Gérer le bug de déformation de mon bouton « nouveau chat » dans le menu aside à gauche

#### Les choix que j'ai faits :

* Arrêter à l'heure aujourd'hui

#### Ce que tu referais différemment :

*

#### Les prochaines étapes si tu avais eu plus de temps :

* Ce qui reste dans la todo list de non cochée !



------------------
## Jour 4 : Système de conversations

### Todo List :

* [x] Todo de la journée avec durées objectivées sur 6 h au total

> Objectifs du J4 :

* [x] Étape 1 : Mettre en place un système de conversations  <font color="green">
  (15 min)</font>
* [x] Étape 2 : Mettre en place une sidebar pour gérer les conversations  <font color="green">
  (45 min)</font>
* [x] Étape 3 : On fait fonctionner tout ça <font color="green">(2 h)</font>

> Bonus J4 <font color="green">(1 h 30)</font>:

* [ ] Bonus : Supprimer les conv
* [ ] Bonus : Afficher / masquer la sidebar
* [ ] Bonus perso : Afficher l'historique dans l'ordre déchronologique
* [ ] Bonus perso : Afficher le statut de PocketBase

> Ce qui n'a pas été fait les autres jours <font color="green">(1 h 30)</font>:

* [ ] Menus cliquables
* [ ] Revoir le style du bouton « nouveau chat »
* [ ] Bonus : Dispatcher le fichier en composants
* [ ] Faire un "Entrée" au clavier qui soumet et qui ne renvoie pas à la ligne
* [ ] Rendre le lien de l'alerte du modal cliquable
* [ ] Afficher l'heure d'envoi des messages
* [x] Supprimer le contenu inutile en bas de page desktop

> Fin de journée :

* [ ] Cleaner le projet, ajouter des commentaires et, si le temps, supprimer les répétitions
* [x] Remplir le carnet de bord (15 min)

> Pour le portfolio à l'avenir :

* [ ] Voir pour la manip `npm run build` pour créer un fichier lisible dans GitHub Pages
* [ ] Push la version du fichier pour le portfolio, avec README et explication de comment créer sa clé API Mistral, c'est gratuit, etc.

### Bilan de fin de journée

#### Ce que j'ai réussi à faire :

* Survivre 🫠
* De manière générale, réussir à faire toute la mise en place sans regarder les corrections. Je me suis acharnée à suivre ma logique. Je suis contente de m'y être retrouvée, bien que je m'y sois perdue de nombreuses fois tout de même !
* Très contente d'avoir pu gérer l'affichage d'un chat de homepage qui ouvre ensuite sur une conversation.

#### Ce que je n'ai pas réussi à faire :

* Beaucoup de choses par manque de temps, mais sinon ce que j'avais tenté les précédents jours sans succès, à savoir :
* Menus cliquables
* Revoir le style du bouton « nouveau chat »
* Faire un "Entrée" au clavier qui soumet et qui ne renvoie pas à la ligne
* Rendre le lien de l'alerte du modal cliquable

#### Les choix que j'ai faits :

*

#### Ce que tu referais différemment :

* Je me suis entêtée à vouloir gérer à ma façon les conversations ; la prochaine fois, je suivrai les tips donnés 😅, puisque ça m'aurait sûrement permis d'aller plus vite. En attendant, j'ai tout de même réussi à faire ce que je voulais. Je suis curieuse de savoir si c'était pertinent ou non, si ma méthode est plus lourde qu'une autre manière de faire.

#### Les prochaines étapes si tu avais eu plus de temps :

* Faire l'option de suppression des conversations
* Le filtrage des conv grâce à l'historique, mais là vraiment je manquais de temps sur le délai imparti
* Ajouter l'heure d'envoi des messages : je pense que c'était jouable, mais je me suis focus sur d'autres choix plus longs à traiter
* Cleaner mon projet !!!
