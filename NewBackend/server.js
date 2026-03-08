const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Import MongoDB connection
const connectDB = require('./db');

// Import and use routers
const ordersRouter = require('./Routers/orderRouter');
const feedbackRouter = require('./Routers/feedbackRouter');

// Health check endpoint
app.get('/', async (req, res) => {
  try {
    await connectDB();
    res.json({ message: 'Trinket Bloom API is running!', database: 'Connected' });
  } catch (error) {
    res.status(500).json({ message: 'API running but database connection failed', error: error.message });
  }
});

// Attach the routers to their respective endpoints.
app.use('/orders', ordersRouter);
app.use('/feedback', feedbackRouter);

// Catch-all for any unhandled routes
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, async () => {
    await connectDB();
    console.log(`Backend server running at http://localhost:${port}`);
  });
}

module.exports = app;

