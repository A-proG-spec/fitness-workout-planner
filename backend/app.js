import express from 'express';
import cors from 'cors';
import planroute from './routes/planRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import authRoutes from './routes/authRoutes.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'], // React dev servers
    credentials: true,  // Allow cookies to be sent
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.get('/', (req, res) => {
  res.json({
    message: 'Fitness Workout Planner API',
    version: '1.0.0',
  });
});

app.use('/api/plan', planroute);
app.use('/api/users/profile', profileRoutes);
app.use('/api/auth', authRoutes);
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

export default app;
