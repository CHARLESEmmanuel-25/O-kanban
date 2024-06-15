# Gitflow S06 / S07

## 1. S'assurer que `master` est "clean"

* Si vous êtes déjà sur une branche `jour1` :
  * Le `git status` doit être "clean", sinon `commit/push`
  * Puis retourner sur `master` : `git checkout master`

* Si vous aviez codé directement sur `master` :
  * Le `git status` doit être "clean", sinon `commit/push`
  * Sauvegarder votre travail sur une branche à part : `git checkout -b jour1` puis `git push` (suivre les instructions si demandé)
  * Retourner ensuite sur `master` : `git checkout master`

## 2. Ajouter le remote du prof

* `git remote add prof URL_SSH_DEPOT_PROF` : ajout d'un remote `prof`

`git remote add prof git@github.com:O-clock-Onigiri/S06E01-oKanban-API-Kenshirosan.git`

## 3. Récupérer les modifications du prof sur `master`

> **Remplacer prof par correction si vous avez du créer un remote correction**

* `git branch --show-current` : s'assurer d'être bien sur la branche `master`.
* `git fetch prof` : récupère le code du prof, sans l'intégrer.
* `git reset --hard prof/master`

## 4. Créer une nouvelle branche pour la journée 2

Normalement, vous devriez alors avoir sur `master` le code du prof ! Il ne reste plus qu'à créer une nouvelle branche pour l'atelier de la journée !

* `git checkout -b jour2`

## Si vous voulez garder vos changement, ne codez pas sur la branche master

## Si vous voulez coder comme en entreprise, ne codez pas sur la branche master
