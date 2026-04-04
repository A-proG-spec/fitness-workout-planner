import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const {
    // Server Configuration
    PORT = 5000,
    NODE_ENV = 'development',
    DB_URI = 'mongodb://localhost:27017/fitness_workout_planner',
    
    // JWT Settings (Simple HS256 - No RSA Keys)
    JWT_SECRET = 'your_super_secret_key_change_this_in_production_min_32_characters',
    JWT_EXPIRE = '7d',
    
    // Keep these for compatibility (optional)
    ACCESS_TOKEN_EXPIRE = '15m',
    REFRESH_TOKEN_EXPIRE = '7d',
} = process.env;