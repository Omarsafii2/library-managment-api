import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend the Request interface to include the user property
declare global {
    namespace Express {
        interface Request {
            user?: any; // You can replace any with a more specific type if you have a user interface
        }
    }
}

// Your middleware to check for the JWT token
const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Get the token from the Authorization header

    if (!token) {
        res.status(401).send('Access Denied: No Token Provided');
        return; // Stop further execution
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = decoded;  // Attach the decoded user data to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(400).send('Invalid Token');
        return; // Stop further execution
    }
};

export default authMiddleware;