// config/rateLimiter.js

import rateLimit from 'express-rate-limit';

// Function to generate a custom message based on the request
const customRateLimitMessage = (req) => {
    return `Too many requests from IP ${req.ip}. Please try again later.`;
};

// Rate limiter for general routes
const generalLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5, // Limit each IP to 5 requests per windowMs
    message: customRateLimitMessage,
    headers: true, // Add rate limit info to response headers
});

// Rate limiter for login routes
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: customRateLimitMessage,
    headers: true,
});

// Rate limiter for admin routes
const adminLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10,
    message: customRateLimitMessage,
    headers: true,
});

export { generalLimiter, loginLimiter, adminLimiter };