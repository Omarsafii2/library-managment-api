import { Request, Response } from 'express';
import Author from '../models/Author';
import { IController } from '../interfaces/IController';

class AuthorController implements IController {
    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const authors = await Author.getAll();
            res.status(200).json(authors);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getById(req: Request, res: Response): Promise<void> {
        try {
            const authorId = parseInt(req.params.id);
            const author = await Author.getById(authorId);

            if (author) {
                res.status(200).json(author);
            } else {
                res.status(404).json({ error: 'Author not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const { name, bio } = req.body;

            if (!name || !bio) {
                res.status(400).json({ error: 'Name and bio are required' });
                return;
            }

            const authorId = await Author.create(name, bio);
            res.status(201).json({ id: authorId, name, bio });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const authorId = parseInt(req.params.id);
            const { name, bio } = req.body;

            if (!name || !bio) {
                res.status(400).json({ error: 'Name and bio are required' });
                return;
            }

            await Author.update(authorId, name, bio);
            res.status(200).json({ message: 'Author updated successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const authorId = parseInt(req.params.id);
            await Author.delete(authorId);
            res.status(200).json({ message: 'Author deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default AuthorController;
