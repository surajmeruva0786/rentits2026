import { Request, Response } from 'express';
import { loadRequestSchema } from '../validators/loadSchema';
import { calculateLoad } from '../services/loadCalculator';
import { ZodError } from 'zod';

/**
 * Controller for handling load calculation requests
 */
export async function calculateLoadController(
    req: Request,
    res: Response
): Promise<void> {
    try {
        // Validate request body
        const validatedData = loadRequestSchema.parse(req.body);

        // Calculate load
        const result = calculateLoad(validatedData.items);

        // Send response
        res.json(result);
    } catch (error) {
        // Handle validation errors
        if (error instanceof ZodError) {
            res.status(400).json({
                error: true,
                message: 'Validation failed',
                details: error.errors.map((err) => ({
                    field: err.path.join('.'),
                    message: err.message,
                })),
            });
            return;
        }

        // Handle unexpected errors
        res.status(500).json({
            error: true,
            message: 'Internal server error',
            details: [],
        });
    }
}
