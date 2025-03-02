import express from 'express';
import ControllerFactory from '../factory/ControllerFactory';

const router = express.Router();
const authorController = ControllerFactory.createController('author');

router.get('/', authorController.getAll.bind(authorController));
router.get('/:id', authorController.getById.bind(authorController));
router.post('/', authorController.create.bind(authorController));
router.put('/:id', authorController.update.bind(authorController));
router.delete('/:id', authorController.delete.bind(authorController));

export default router;
