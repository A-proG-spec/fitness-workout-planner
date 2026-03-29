// const app = require ('./app');
// const connectDB = require ('./config/db');
import app from './app.js'
import connectDB from './config/db.js'
import './config/env.js';
connectDB ();

const PORT = process.env.PORT || 5000;

const server = app.listen (PORT, () => {
  console.log (
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});
