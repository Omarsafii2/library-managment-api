import express from 'express';
import ControllerFactory from '../factory/ControllerFactory';

const router = express.Router();
const bookController = ControllerFactory.createController('book');

router.get('/', bookController.getAll.bind(bookController));
router.get('/:id', bookController.getById.bind(bookController));
router.post('/', bookController.create.bind(bookController));
router.put('/:id', bookController.update.bind(bookController));
router.delete('/:id', bookController.delete.bind(bookController));

export default router;
