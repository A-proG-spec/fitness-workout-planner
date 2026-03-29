import express from 'express';
import cors from 'cors';
import planroute from './routes/planRoutes.js';
const app = express ();

app.use (express.json ());
app.use (express.urlencoded ({extended: true}));
app.use (cors ());

app.get ('/', (req, res) => {
  res.json ({
    message: 'Fitness Workout Planner API',
    version: '1.0.0',
  });
});

app.use ('api/plan', planroute);
app.use ((req, res) => {
  res.status (404).json ({success: false, error: 'Route not found'});
});

export default app;
