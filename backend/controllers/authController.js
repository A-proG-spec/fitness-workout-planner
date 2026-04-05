import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { JWT_SECRET, JWT_EXPIRE, NODE_ENV } from '../config/env.js';

const generateToken = (userId) => {
    return jwt.sign(
        { user_id: userId }, 
        JWT_SECRET,
        { expiresIn: JWT_EXPIRE }
    );
};

const setTokenCookie = (res, token) => {
    res.cookie('access_token', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'lax',
        secure: NODE_ENV === 'production'
    });
};

export const register = async (req, res, next) => {
    try {
        const { name, email, password, gender, dateOfBirth, height, weight, fitnessGoal } = req.body;

        if (!name || !email || !password) {
            const error = new Error('Name, email and password are required');
            error.statusCode = 400;
            throw error;
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const error = new Error('Email already exists');
            error.statusCode = 409;
            throw error;
        }

        if (password.length < 6) {
            const error = new Error('Password must be at least 6 characters');
            error.statusCode = 400;
            throw error;
        }

        // ✅ Hash password here instead of in model
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,  // Use hashed password
            gender,
            dateOfBirth,
            height,
            weight,
            fitnessGoal
        });

        const token = generateToken(user._id);
        setTokenCookie(res, token);

        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: { user: userResponse, token }
        });
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            const error = new Error('Email and password are required');
            error.statusCode = 400;
            throw error;
        }

        const user = await User.findOne({ email }).select('+password');
        
        if (!user) {
            const error = new Error('Invalid credentials');
            error.statusCode = 401;
            throw error;
        }

        // ✅ Compare passwords
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        
        if (!isPasswordMatch) {
            const error = new Error('Invalid credentials');
            error.statusCode = 401;
            throw error;
        }

        const token = generateToken(user._id);
        setTokenCookie(res, token);

        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: { user: userResponse, token }
        });
    } catch (err) {
        next(err);
    }
};

export const logout = async (req, res, next) => {
    try {
        res.cookie('access_token', '', { maxAge: 0, httpOnly: true });
        res.status(200).json({
            success: true,
            message: 'Logout successful'
        });
    } catch (err) {
        next(err);
    }
};

export const getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        
        res.status(200).json({
            success: true,
            data: { user }
        });
    } catch (err) {
        next(err);
    }
};

export const refreshToken = async (req, res, next) => {
    try {
        const token = req.cookies.access_token;
        
        if (!token) {
            const error = new Error('No token provided');
            error.statusCode = 401;
            throw error;
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const newToken = generateToken(decoded.user_id);
        setTokenCookie(res, newToken);

        res.status(200).json({
            success: true,
            message: 'Token refreshed successfully',
            data: { token: newToken }
        });
    } catch (err) {
        const error = new Error('Invalid or expired token');
        error.statusCode = 401;
        next(error);
    }
};