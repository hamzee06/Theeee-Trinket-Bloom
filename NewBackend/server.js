const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Import the database connection
const db = require('./db');

// Import and use routers
const ordersRouter = require('./Routers/orderRouter');
const feedbackRouter = require('./Routers/feedbackRouter');

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Trinket Bloom API is running!' });
});

// Attach the routers to their respective endpoints.
app.use('/orders', ordersRouter);
app.use('/feedback', feedbackRouter);

// Catch-all for any unhandled routes
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// Start the server
app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});

module.exports = app;

