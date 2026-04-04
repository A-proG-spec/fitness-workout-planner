import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { JWT_SECRET } from '../config/env.js';

export const protect = async (req, res, next) => {
    let token;

    // Check for token in cookies first, then headers
    if (req.cookies?.access_token) {
        token = req.cookies.access_token;
    } else if (req.headers.authorization?.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        const error = new Error('Not authorized, no token');
        error.statusCode = 401;
        return next(error);
    }

    try {
        // Simple verification - no algorithm specification needed
        const decoded = jwt.verify(token, JWT_SECRET);
        
        req.user = await User.findById(decoded.user_id).select('-password');
        
        if (!req.user) {
            const error = new Error('User not found');
            error.statusCode = 401;
            throw error;
        }
        
        next();
    } catch (err) {
        const error = new Error('Not authorized, token failed');
        error.statusCode = 401;
        next(error);
    }
};


export const isAdmin = async (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        const error = new Error('Admin access required');
        error.statusCode = 403;
        next(error);
    }
};