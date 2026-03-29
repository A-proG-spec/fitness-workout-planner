// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
import express from 'express';
import cors from'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());



// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'Fitness Workout Planner API',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            workouts: '/api/workouts',
            progress: '/api/progress'
        }
    });
});

// Error handler for 404
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route not found'
    });
});

// module.exports = app;
export default app;