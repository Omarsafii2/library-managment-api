import express from 'express';
import authorRoutes from './routes/authorRoutes';
import bookRoutes from './routes/bookRoutes';
import authRoutes from './routes/authRoutes';
import authMiddleware from './middleware/authMiddleware';

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);

// Apply the middleware only for certain routes
app.use('/authors', authMiddleware, authorRoutes);
app.use('/books', authMiddleware, bookRoutes);

export default app;
