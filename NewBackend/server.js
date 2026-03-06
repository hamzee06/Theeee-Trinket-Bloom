const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Import the database connection from the new db.js file.
// The table creation is now handled inside db.js.
const db = require('./db');

// Import and use routers
const ordersRouter = require('./Routers/orderRouter');
const feedbackRouter = require('./Routers/feedbackRouter');

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

