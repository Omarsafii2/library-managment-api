import Database from '../utils/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import notificationService from "../services/NotificationService";

const pool = Database.getPool();

interface AuthorData extends RowDataPacket {
    id: number;
    name: string;
    bio: string;
    created_at: string;
}

class Author {
    id: number;
    name: string;
    bio: string;

    constructor(id: number, name: string, bio: string) {
        this.id = id;
        this.name = name;
        this.bio = bio;
    }

    static async getAll(): Promise<Author[]> {
        const [rows] = await pool.query<AuthorData[]>('SELECT * FROM authors');
        return rows.map(row => new Author(row.id, row.name, row.bio));
    }

    static async getById(id: number): Promise<Author | null> {
        const [rows] = await pool.query<AuthorData[]>('SELECT * FROM authors WHERE id = ?', [id]);
        return rows[0] ? new Author(rows[0].id, rows[0].name, rows[0].bio) : null;
    }

    static async create(name: string, bio: string): Promise<number> {
        const [result] = await pool.query<ResultSetHeader>('INSERT INTO authors (name, bio) VALUES (?, ?)', [name, bio]);
        notificationService.notify("AuthorCreated", { name, bio });

        return result.insertId;
    }

    static async update(id: number, name: string, bio: string): Promise<void> {
        await pool.query('UPDATE authors SET name = ?, bio = ? WHERE id = ?', [name, bio, id]);
    }

    static async delete(id: number): Promise<void> {
        await pool.query('DELETE FROM authors WHERE id = ?', [id]);
    }
}

export default Author;