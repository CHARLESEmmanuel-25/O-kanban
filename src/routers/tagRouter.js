import { Router } from 'express';
import { tagController } from '../controllers/tagController.js';
import { controllerWrapper as cw } from './controllerWrapper.js';

export const router = Router();

router.get('/tags', cw(tagController.index));
router.get('/tags/:id', cw(tagController.show));

router.post('/tags', cw(tagController.store));
router.patch('/tags/:id', cw(tagController.update));
router.delete('/tags/:id', cw(tagController.destroy));

router.patch('/cards/:cardId/tags/:tagId', cw(tagController.assignTagToCard));
router.delete(
    '/cards/:cardId/tags/:tagId',
    cw(tagController.removeTagFromCard)
);
