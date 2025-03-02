import { RowDataPacket, ResultSetHeader } from 'mysql2';
import notificationService from "../services/NotificationService";
import Database from '../utils/database';



const pool = Database.getPool();



interface BookData extends RowDataPacket {
    id: number;
    title: string;
    description: string;
    author_id: number;
    published_date: string; 
    created_at: string;
}

class Book{
    id: number;
    title: string;
    description: string;
    author_id: number;
    published_date: string; 
    created_at: string;

    constructor(id: number, title: string, description: string, author_id: number, published_date: string, created_at: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.author_id = author_id;
        this.published_date = published_date;
        this.created_at = created_at;
    }
    
    static async getall(): Promise<Book[]> {
        const [rows] = await pool.query<BookData[]>('SELECT * FROM books');
        return rows.map(row => new Book(row.id, row.title, row.description, row.author_id, row.published_date, row.created_at));
    }

    static async getById(id: number): Promise<Book | null> {
        const [rows] = await pool.query<BookData[]>('SELECT * FROM books WHERE id = ?', [id]);
        return rows[0] ? new Book(rows[0].id, rows[0].title, rows[0].description, rows[0].author_id, rows[0].published_date, rows[0].created_at) : null;
    }

    static async create(title: string, description: string, author_id: number, published_date: string): Promise<number> {
        const [result] = await pool.query<ResultSetHeader>('INSERT INTO books (title, description, author_id, published_date) VALUES (?, ?, ?, ?)', [title, description, author_id, published_date]);
        notificationService.notify("BookAdded", { title, description, author_id, published_date });

        return result.insertId;
    }

    static async update(id: number, title: string, description: string, author_id: number, published_date: string): Promise<void> {
        await pool.query('UPDATE books SET title = ?, description = ?, author_id = ?, published_date = ? WHERE id = ?', [title, description, author_id, published_date, id]);
    }

    static async delete(id: number): Promise<void> {
        await pool.query('DELETE FROM books WHERE id = ?', [id]);
    }
}

export default Book;