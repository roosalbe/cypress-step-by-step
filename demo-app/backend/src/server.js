import express from 'express';
import cors from 'cors';
import { initDb } from './db/database.js';

// Import routes
import authRoutes from './routes/auth.js';
import productsRoutes from './routes/products.js';
import cartRoutes from './routes/cart.js';
import ordersRoutes from './routes/orders.js';
import usersRoutes from './routes/users.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json());

// Request logging (development)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/users', usersRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint niet gevonden' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Interne server error' });
});

// Initialize database and start server
async function start() {
  try {
    await initDb();
    console.log('Database geïnitialiseerd');

    app.listen(PORT, () => {
      console.log(`Server draait op http://localhost:${PORT}`);
      console.log(`API endpoints beschikbaar op http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('Kon server niet starten:', error);
    process.exit(1);
  }
}

start();
