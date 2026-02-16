import { z } from 'zod';

/**
 * Zod schema for validating load calculation requests
 */
export const loadItemSchema = z.object({
    title: z
        .string()
        .min(3, 'Title must be at least 3 characters')
        .max(60, 'Title must not exceed 60 characters'),
    dueInDays: z
        .number()
        .int('Due days must be an integer')
        .min(0, 'Due days must be between 0 and 6')
        .max(6, 'Due days must be between 0 and 6'),
    effortLevel: z.enum(['low', 'medium', 'high'], {
        errorMap: () => ({ message: 'Effort level must be low, medium, or high' }),
    }),
});

export const loadRequestSchema = z.object({
    items: z
        .array(loadItemSchema)
        .min(1, 'At least one item is required')
        .max(20, 'Maximum 20 items allowed'),
});

export type LoadItemInput = z.infer<typeof loadItemSchema>;
export type LoadRequestInput = z.infer<typeof loadRequestSchema>;
