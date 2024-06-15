import Joi from 'joi';
import { Card, List } from '../models/index.js';

const hexadecimalColorSchema = Joi.string()
    .pattern(new RegExp('^#([0-9a-fA-F]{3}){1,2}$'))
    .message(
        '"color" with value "#FF00FFF" failed to match expected format. Please use a valid hexadecimal color.'
    );

const cardController = {
    async index(req, res) {
        // Récupérer toutes les cartes en BDD
        const cards = await Card.findAll({
            // inclure les tags des cartes
            include: 'tags',

            // Est-ce que c'est une bonne pratique ?
            // => ça dépend

            // Avantage : une requête en moins à faire par le front pour récupérer les tags des cartes
            // Inconvénient : le potentiel poids de la requête
        });

        // Les renvoyer en JSON
        res.json(cards);
    },

    async show(req, res) {
        // Validation (bonus) sur l'ID (histoire de dire qu'on n'en fait des caisses)
        const { error } = Joi.number()
            .integer()
            .greater(0)
            .validate(req.params.id);
        if (error) {
            return res.status(404).json({
                error: `Card not found. Verify the provided ID. ${error.message}`,
            });
        }

        // Récupére l'ID
        const cardId = parseInt(req.params.id);

        // Récupérer la carte en BDD (avec potentiellement ses tags)
        const card = await Card.findByPk(cardId);

        // Si la carte n'existe pas (ID=90000 => null) ==> 404
        if (!card) {
            return res.status(404).json({ error: 'Card not found.' });
        }

        // Envoyer une réponse
        res.json(card);
    },
    async destroy(req, res) {
        // Récupérer l'Id de la carte à supprimer
        const cardId = parseInt(req.params.id);

        if (!Number.isInteger(cardId)) {
            return res.status(404).json({ error: `Card not found` });
        }

        const card = await Card.findByPk(cardId);

        if (!card) {
            // Si pas entier ou pas existant dans la BDD => 404
            return res.status(404).json({ error: `Card not found` });
        }

        await card.destroy();

        // Sinon on supprime et on renvoie une 204 avec un body vide.
        res.status(204).end();
    },
    async store(req, res) {
        // VALIDER LE BODY :
        // - content non null string
        // - position number positif (peut etre null)
        // - color code hexadecimal (peut être null)
        // - list_id entier positif
        const createCardSchema = Joi.object({
            content: Joi.string().min(1).required(), // min(1) pour éviter la string vide : ""
            list_id: Joi.number().integer().greater(0).required(),
            position: Joi.number().integer().greater(0),
            // color: Joi.string().min(4).max(7) // #FF00FF || #F0F // Note, on pourrait aussi utiliser une REGEX
            color: hexadecimalColorSchema,
        });

        // Récupérer le body
        const { error } = createCardSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.message });
        }

        const { content, list_id, position, color } = req.body;

        // On vérifiera également que la liste dans laquelle on va ajouter la carte EXISTE BIEN !
        // Autrement dit, on vérifie la FOREIGN KEY !
        const list = await List.findByPk(list_id);
        if (!list) {
            return res
                .status(404)
                .json({ error: 'The provided list_id does not exist' });
        }

        // On créer la carte
        const createdCard = await Card.create({
            content,
            list_id,
            position, // si position === undefined, alors Sequelize prendra la version par défaut
            color, // pareil
        });

        // On renvoie le status 201 et la carte créée
        res.status(201).json(createdCard);
    },

    async update(req, res) {
        // Récupérer l'ID de la carte à update
        const cardId = parseInt(req.params.id);
        console.log(cardId);

        // Valider cet ID
        if (!Number.isInteger(cardId)) {
            return res.status(404).json({ error: `Card not found` });
        }

        // Valider le body
        // - content
        // - position
        // - color
        // - list_id ===> vérifier que la liste existe !
        const updateCardSchema = Joi.object({
            content: Joi.string().min(1),
            position: Joi.number().integer().greater(0),
            list_id: Joi.number().integer().greater(0),
            color: hexadecimalColorSchema,
        })
            .min(1)
            .message(
                "Missing body parameters. Provide at least 'content' or 'position' or 'list_id' or 'color' properties"
            );

        const { error } = updateCardSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.message });
        }

        const { content, position, list_id, color } = req.body;

        // Récupérer la carte en BDD
        const card = await Card.findByPk(cardId);

        // Si elle existe pas => 404
        if (!card) {
            return res.status(404).json({ error: `Card not found` });
        }

        // Si l'utilisateur souhaite changer la carte de liste, vérifions si la nouvelle liste existe
        if (list_id) {
            const list = await List.findByPk(list_id);
            if (!list) {
                return res.status(404).json({ error: `List not found` });
            }
        }

        // On peut faire l'update
        const updatedCard = await card.update({
            content,
            position,
            color,
            list_id,
        });

        // Renvoie la carte updated !
        res.json(updatedCard); // Status 200 par défaut si on met rien
    },
};

export { cardController };
