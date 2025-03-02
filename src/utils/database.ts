import mysql from 'mysql2/promise';  // Correct import from 'mysql2/promise'
import dotenv from 'dotenv';

dotenv.config();

class Database {
    private static pool: mysql.Pool;  // Use the correct type here from 'mysql2/promise'

    private constructor() {}  // Prevent direct instantiation

    public static getPool(): mysql.Pool {
        if (!Database.pool) {
            // Create the pool using the promise version from mysql2
            Database.pool = mysql.createPool({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
            });
        }
        return Database.pool;
    }
}

export default Database;
