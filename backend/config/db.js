import mongoose from 'mongoose';
import { DB_URI } from './env.js'; 

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(DB_URI); 
        console.log(`\n MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`\n Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;