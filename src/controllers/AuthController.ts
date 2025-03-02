import { Request, Response } from 'express';
import User from '../models/User';

class AuthController {
    // Register a new user
    static async register(req: Request, res: Response): Promise<void> {
        try {
            const { username, password } = req.body;

            // Basic validation
            if (!username || !password) {
                res.status(400).json({ error: 'Username and password are required' });
                return;
            }

            await User.create(username, password);
            const user= await User.findByUsername(username);
            const token = User.generateAuthToken(user.id);

            res.status(201).json({ message: 'User registered successfully',token });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // Login an existing user
    static async login(req: Request, res: Response): Promise<void> {
        try {
            const { username, password } = req.body;

            // Basic validation
            if (!username || !password) {
                res.status(400).json({ error: 'Username and password are required' });
                return;
            }

            const user = await User.findByUsername(username);

            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }

            const isValidPassword = await User.comparePassword(password, user.password);

            if (!isValidPassword) {
                res.status(400).json({ error: 'Invalid credentials' });
                return;
            }

            // Generate JWT token
            const token = User.generateAuthToken(user.id);

            res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default AuthController;
