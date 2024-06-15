# MCD de okanban

---

- On souhaite créer une application de type Kanban où il est possible de créer des cartes à l'intérieur de listes.
- L'utilisateur peut créer autant de listes qu'il désire et mettre autant de cartes à l'intérieur de ces listes.
- Chaque liste dispose d'un nom.
- Chaque carte dispose d'un titre, d'une position au sein de la liste, d'une couleur (optionnelle) et d'un ou plusieurs label(s) (optionnel(s))

```
LISTE: code liste, nom, ordre
:
LABEL: code label, nom, couleur

APPARTENIR, 11 CARTE, 0N LISTE
CARTE: code carte, titre, ordre, couleur
POSSEDE, 0N LABEL, 0N CARTE
```

(user)
