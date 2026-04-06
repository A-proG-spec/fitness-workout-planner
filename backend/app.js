import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Import Routes
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import planRoutes from './routes/planRoutes.js';
import progressRoutes from './routes/progressRoutes.js';
import exerciseRoutes from './routes/exerciseRoute.js'
import adminRoutes from './routes/adminRoute.js'
// Import Middleware
import errorHandler from './middleware/errorHandler.js';

// Import Config
import { NODE_ENV } from './config/env.js';

const app = express();

// ========== MIDDLEWARE ==========

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

// CORS middleware
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'], // React dev servers
    credentials: true,  // Allow cookies to be sent
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// ========== API ROUTES ==========

// Health check route
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString(),
        environment: NODE_ENV
    });
});

// API version info
app.get('/api', (req, res) => {
    res.status(200).json({
        success: true,
        name: 'Fitness Workout Planner API',
        version: '1.0.0',
        status: 'active',
        endpoints: {
            auth: '/api/auth',
            profile: '/api/profile',
            plans: '/api/plans',
            progress: '/api/progress',
            exercises: '/api/exercises'
        }
    });
});

// Main API routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/admin', adminRoutes);
// ========== ERROR HANDLING ==========

// 404 handler for undefined routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl}`
    });
});

// Global error handler (must be last)
app.use(errorHandler);

export default app;