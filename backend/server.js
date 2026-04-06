import './config/env.js'; 
import app from './app.js';
import connectDB from './config/db.js';
import { NODE_ENV } from './config/env.js';

connectDB();

const serverPort = process.env.PORT || 5000;

app.listen(serverPort, () => {
    console.log(`Server running in ${NODE_ENV} mode on port ${serverPort}`);
});