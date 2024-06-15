# RESTful

---

CRUD : CREATE, READ, UPDATE, DELETE : actions

RESTful : l'ensemble des méthode et des verbes à utiliser pour implémenter le CRUD

GET : sert à lire des données
POST : sert à créer des données
PATCH: sert à mettre à jour de données
PUT : Si la donnée n'existe pas, on la créé, sinon on la met à jour
DELETE : sert à effacer des données

## Les 7 méthodes REST

- `index` : sert à obtenir une liste de ressources : GET : Model.findAll
- `show` : on obtient le détail d'une ressource : GET Model.findByPk
- `create` : on afficher un formulaire pour créer une ressource : GET
- `store` : on persiste la ressource en BDD : POST ou PUT Model.create
- `edit` : on affiche le forlulaire pour mettre à jour une donnée : GET Model.findByPk
- `update` : on persiste la mise à jour : PUT ou PATCH Model.update
- `destroy` : on efface une donnée : DELETE Model.destroy
