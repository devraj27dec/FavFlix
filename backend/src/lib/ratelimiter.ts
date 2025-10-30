
import rateLimit from "express-rate-limit";


export const perMinuteLimiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 10,
  message: "Too many requests. Try again in a minute.",
  keyGenerator: (req) => {
    return req.body.email;
  },
  standardHeaders: true, 
  legacyHeaders: false,  
});

// per-hour limiter
export const perMinuteLimiterRelaxed = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: "Too many requests. Try again in an hour.",
  keyGenerator: (req) => {
    return req.body.email;
  },
  standardHeaders: true, 
  legacyHeaders: false,  
});