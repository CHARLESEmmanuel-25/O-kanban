import { Router } from 'express';
export const router = Router();

import { mainController } from '../controllers/mainController.js';
import { listController } from '../controllers/listController.js';

import { controllerWrapper as cw } from './controllerWrapper.js';
// DONE
router.get('/', mainController.index);
// * - `index` : sert à obtenir une liste de ressources : GET : Model.findAll
router.get('/lists', cw(listController.index));
// * - `show` : on obtient le détail d'une ressource : GET Model.findByPk
router.get('/lists/:id(\\d+)', cw(listController.show));
// * - `store` : on persiste la ressource en BDD : POST ou PUT Model.create
router.post('/lists', cw(listController.store));
// * - `update` : on persiste la mise à jour : PUT ou PATCH Model.update
router.patch('/lists/:id(\\d+)', cw(listController.update));
// * - `destroy` : on efface une donnée : DELETE Model.destroy
router.delete('/lists/:id(\\d+)', cw(listController.destroy));
