import Joi from 'joi';
import { Tag, Card } from '../models/index.js';

const tagController = {
    async index(req, res) {
        const tags = await Tag.findAll();
        return res.json(tags);
    },

    async show(req, res) {
        const tagId = parseInt(req.params.id);
        if (!Number.isInteger(tagId)) {
            return res.status(404).json({ error: 'Tag not found.' });
        }

        const tag = await Tag.findByPk(tagId);
        if (!tag) {
            return res.status(404).json({ error: 'Tag not found.' });
        }

        res.json(tag);
    },

    async destroy(req, res) {
        const tagId = parseInt(req.params.id);
        if (!Number.isInteger(tagId)) {
            return res.status(404).json({ error: 'Tag not found.' });
        }

        const tag = await Tag.findByPk(tagId, { include: 'cards' });

        if (tag.cards.length) {
            return res.status(401).json({
                error: "Le tag est associé, vous devez d'abord le désassocier",
            });
        }

        if (!tag) {
            return res.status(404).json({ error: 'Tag not found.' });
        }

        await tag.destroy();

        res.status(204).json({ message: 'ok' });
    },
    async store(req, res) {
        const createTagSchema = Joi.object({
            name: Joi.string().min(1).required(),
            color: getHexadecimalColorSchema(),
        });

        const { error } = createTagSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.message });
        }

        // On vérifie s'il n'existe pas déjà un tag avec le même nom, auquel cas on envoie une 409 (Conflit)
        const isTagNameAlreadyTaken = !!(await Tag.count({
            where: { name: req.body.name },
        })); // 0 (false) ou 1 (true)
        if (isTagNameAlreadyTaken) {
            return res
                .status(409)
                .json({ error: 'The provided tag name is already taken.' });
        }

        const { name, color } = req.body;
        const createdTag = await Tag.create({ name, color });

        res.status(201).json(createdTag);
    },
    async update(req, res) {
        const tagId = parseInt(req.params.id);
        if (!Number.isInteger(tagId)) {
            return res.status(404).json({ error: `Tag not found.` });
        }

        const updateTagSchema = Joi.object({
            name: Joi.string().min(1),
            color: getHexadecimalColorSchema(),
        })
            .min(1)
            .message(
                "Missing body parameters. Provide at least 'name' or 'color' property."
            );

        const { error } = updateTagSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.message });
        }

        const tag = await Tag.findByPk(tagId);
        if (!tag) {
            return res.status(404).json({ error: 'Tag not found.' });
        }

        const { name, color } = req.body;
        const updatedTag = await tag.update({
            name: name || tag.name,
            color: color || tag.color,
        });

        res.json(updatedTag);
    },
    async assignTagToCard(req, res) {
        const tagId = parseInt(req.params.tagId);
        if (!Number.isInteger(tagId)) {
            return res.status(404).json({ error: 'Tag not found.' });
        }

        const cardId = parseInt(req.params.cardId);
        if (!Number.isInteger(cardId)) {
            return res.status(404).json({ error: 'Card not found.' });
        }

        const tag = await Tag.findByPk(tagId);
        if (!tag) {
            return res.status(404).json({ error: 'Tag not found.' });
        }

        const card = await Card.findByPk(cardId);
        if (!card) {
            return res.status(404).json({ error: 'Card not found.' });
        }

        await card.addTag(tag);

        // Techniquement : 204 + res.end()
        // MAIS PRATIQUE : on renvoie la carte à jour pour vérification
        const updatedCard = await Card.findByPk(cardId, { include: ['tags'] });
        res.status(201).json(updatedCard);
    },
    async removeTagFromCard(req, res) {
        const tagId = parseInt(req.params.tagId);
        const cardId = parseInt(req.params.cardId);
        console.log(tagId);
        console.log(cardId);
        if (!Number.isInteger(tagId)) {
            return res.status(404).json({ error: 'Tag not found.' });
        }

        if (!Number.isInteger(cardId)) {
            return res.status(404).json({ error: 'Card not found.' });
        }

        const tag = await Tag.findByPk(tagId);
        if (!tag) {
            return res.status(404).json({ error: 'Tag not found.' });
        }

        const card = await Card.findByPk(cardId);
        if (!card) {
            return res.status(404).json({ error: 'Card not found.' });
        }

        await card.removeTag(tag);

        // Techniquement : 204 + res.end()
        // MAIS PRATIQUE : on renvoie la carte à jour pour vérification
        const updatedCard = await Card.findByPk(cardId, { include: ['tags'] });
        res.status(201).json(updatedCard);
    },
};

function getHexadecimalColorSchema() {
    return Joi.string()
        .pattern(new RegExp('^#([0-9a-fA-F]{3}){1,2}$'))
        .message(
            '"color" with value "#FF00FFF" failed to match expected format. Please use a valid hexadecimal color.'
        );
}

export { tagController, getHexadecimalColorSchema };
