import { Request, Response } from 'express';
import Book from '../models/Book';
import { IController } from '../interfaces/IController';

class BookController implements IController {
    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const books = await Book.getall();
            res.status(200).json(books);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getById(req: Request, res: Response): Promise<void> {
        try {
            const bookId = parseInt(req.params.id);
            const book = await Book.getById(bookId);

            if (book) {
                res.status(200).json(book);
            } else {
                res.status(404).json({ error: 'Book not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const { title, description, author_id, published_date } = req.body;

            if (!title || !description || !author_id || !published_date) {
                res.status(400).json({ error: 'All fields are required' });
                return;
            }

            const bookId = await Book.create(title, description, author_id, published_date);
            res.status(201).json({ id: bookId, title, description, author_id, published_date });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const bookId = parseInt(req.params.id);
            const { title, description, author_id, published_date } = req.body;

            if (!title || !description || !author_id || !published_date) {
                res.status(400).json({ error: 'All fields are required' });
                return;
            }

            await Book.update(bookId, title, description, author_id, published_date);
            res.status(200).json({ message: 'Book updated successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const bookId = parseInt(req.params.id);
            await Book.delete(bookId);
            res.status(200).json({ message: 'Book deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default BookController;
