import BookController from '../controllers/BookController';
import AuthorController from '../controllers/AuthorController';
import AuthController from '../controllers/AuthController';

class ControllerFactory {
    static createController(controllerType: string) {
        switch (controllerType) {
            case 'book':
                return new BookController();
            case 'author':
                return new AuthorController();
            default:
                throw new Error(`Controller type ${controllerType} not found`);
        }
    }
}

export default ControllerFactory;
