# CARNET DE BORD DU PROJET

## Jour 1 : Wireframe et intégration HTML/CSS dans Svelte

### Todo List :

* [x] Mettre en place le carnet de bord
* [x] Faire une pige de style
* [x] Prépa du fichier pour portfolio
* [x] Relire le cahier des charges
* [x] Créer le wireframe (max 1h30)
* [x] Mettre en place le projet Svelte (30 min)
* [x] Intégrer l'UI en mobile first (4h)
* [ ] Push version du fichier pour le portfolio

### Bilan de fin de journée :

#### Ce que je n'ai pas réussi à faire

* Gérer l'agrandissement automatique du champ texte de conversation sur les versions mobile et tablette afin qu'il s'agrandisse suivant le texte tapé, puis qu'il se fixe à un max de 4 lignes par exemple.
* Faire toutes les intégrations cliquables du site.

#### Les choix que j'ai faits

* J'ai passé un peu plus de temps que prévu sur la maquette, bien qu'en ayant utilisé un template.
  Prévu 1h30 max, j'y ai passé 2h30.
  Je pensais être plus rapide sur cet aspect, mais cela m'a permis de comprendre un peu mieux Figma.

* Graphiquement, j'ai un peu adapté le style pendant la phase d'intégration vs les maquettes prévues, parce que plus homogène selon moi au final, et pour essayer de gagner un peu de temps.

#### Ce que tu referais différemment

* Partir sur vraiment quelque chose de simple et épuré graphiquement pour d'abord mettre en place l'aspect fonctionnel, puis faire le style.

#### Les prochaines étapes si tu avais eu plus de temps

* Mieux gérer la version desktop.
* Cleaner mon fichier Svelte pour faire des modules pour chaque zone du site.
* Faire toute la partie interactions.

------------------

## Jour 2 : Interaction avec l'IA et réponse aux demandes

### Todo List :

* [x] Todo de la journée avec durées objectivées sur 6 h au total
* [ ] Finir d'intégrer l'UI en mobile first (1 h 15)  
> Sous-tâches sur l'intégration :
* [x] Favicon
* [x] Intégration partie chat
* [ ] Menus cliquables
* [X] Modal de login à l'arrivée
* [ ] Revoir le style du bouton « nouveau chat »
* [ ] Bonus : Dispatcher le fichier en composants   
> Puis :
* [x] Mettre le token dans un fichier dédié et faire immédiatement un .gitignore dessus
* [x] Étape 2 : Lier l'API à Mistral AI (1 h 30)
* [x] Gérer les réponses et erreurs éventuelles
* [x] Étape 3 : Gérer un affichage différencié entre user et IA (1 h 30)
* [x] Nettoyer le système de tableau — étape 3
* [x] Reset du champ de saisie
* [X] Étape 4 : Sécuriser le token Mistral (1 h)
* [ ] Bonus : usage eMarkdown (30 min)
* [X] Remplir le carnet de bord (15 min)
* [ ] Push la version du fichier pour le portfolio

### Bilan de fin de journée
#### Ce que j'ai réussi à faire :
* Avancer sur l'intégration manquante de la partie chat
* Lier le tout à l'API de Mistral
* Faire le style du chat pour differentier les messages
* Faire l'usage du tokken sans le faire apparaitre dans le code (enfin sauf erreur de ma part)

#### Ce que je n'ai pas réussi à faire
* Les zones cliquables du header et de l'historique n'ont pas été traité du tout
* L'affichage de l'heure d'envoi des messages
* Faire en sorte que l'on soit toujours du scroll dans la zone du chat

#### Les choix que j'ai faits

* J'ai commencé à regarder les interactions, notamment pour réduire la zone d'historique : j'ai abandonné car je perdais trop de temps.

#### Ce que tu referais différemment

#### Les prochaines étapes si tu avais eu plus de temps
* Gérer la touche Entrée au clavier pour envoyer le message
* Gérer l'affichage de l'heure d'envoi du message
* Ajouter un symbole de chargement le temps que le serveur réponde
* Faire en sorte que l'on soit toujours du scroll dans la zone du chat
* Gérer des messages d'alerte si le token Mistral n'est pas bon


------------------

## Jour 3 :