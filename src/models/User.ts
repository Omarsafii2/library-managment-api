import bcrypt from 'bcryptjs';
import Database from '../utils/database';
import jwt from 'jsonwebtoken';
import notificationService from "../services/NotificationService";

const pool = Database.getPool();

class User {
    static async create(username: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.execute('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
        notificationService.notify("UserRegistered", { username });
        return result;
       

    }

    static async findByUsername(username: string) {
        const [rows]: any[][] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);
        return rows.length > 0 ? rows[0] : null;
    }

    static async comparePassword(enteredPassword: string, storedPassword: string) {
        return bcrypt.compare(enteredPassword, storedPassword);
    }

    static generateAuthToken(id: number) {
        return jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    }
}

export default User;
