import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { ACCESS_TOKEN_PUBLIC_KEY } from '../config/env.js';

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
        const decoded = jwt.verify(token, ACCESS_TOKEN_PUBLIC_KEY, {
            algorithms: ['RS256']
        });
        
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