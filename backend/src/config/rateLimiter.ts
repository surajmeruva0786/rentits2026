import rateLimit from 'express-rate-limit';

/**
 * Rate limiter configuration
 * 100 requests per IP per 15 minutes
 */
export const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
        error: true,
        message: 'Too many requests, please try again later.',
        details: [],
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
