const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Import and connect to MongoDB
const connectDB = require('./db');
connectDB();

// Import and use routers
const ordersRouter = require('./Routers/orderRouter');
const feedbackRouter = require('./Routers/feedbackRouter');

// Attach the routers to their respective endpoints.
app.use('/orders', ordersRouter);
app.use('/feedback', feedbackRouter);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Trinket Bloom API is running!' });
});

// Catch-all for any unhandled routes
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// Start the server
app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});

module.exports = app;

