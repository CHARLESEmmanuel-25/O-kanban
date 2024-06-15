import { Router } from 'express';
import { cardController } from '../controllers/cardController.js';
import { controllerWrapper as cw } from './controllerWrapper.js';

export const router = Router();

router.get('/cards', cw(cardController.index));
router.get('/cards/:id', cw(cardController.show));
router.post('/cards', cw(cardController.store));
router.patch('/cards/:id', cw(cardController.update));
router.delete('/cards/:id', cw(cardController.destroy));
