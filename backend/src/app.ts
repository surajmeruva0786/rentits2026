import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { rateLimiter } from './config/rateLimiter';
import calculateRoutes from './routes/calculate';

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
const corsOptions = {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Body parsing middleware with size limit
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Rate limiting
app.use(rateLimiter);

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok' });
});

// API routes
app.use('/api/v1', calculateRoutes);

// 404 handler
app.use((_req: Request, res: Response) => {
    res.status(404).json({
        error: true,
        message: 'Route not found',
        details: [],
    });
});

// Global error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    // Log error in development only
    if (process.env.NODE_ENV === 'development') {
        console.error(err); // eslint-disable-line no-console
    }

    // Send generic error response (no stack traces in production)
    res.status(500).json({
        error: true,
        message: 'Internal server error',
        details: [],
    });
});

export default app;
