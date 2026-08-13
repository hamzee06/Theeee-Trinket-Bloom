const express = require('express');
const router = express.Router();
// Correct path to the new controller
const orderController = require('../Controllers/oderController');
const requireAdminKey = require('../Middlewares/requireAdminKey');

// Define the routes for orders.

// GET route to retrieve all orders — admin-only, since orders contain customer PII.
router.get('/', requireAdminKey, orderController.getAllOrders);

// POST route to create a new order. Stays public: checkout remains anonymous.
router.post('/', orderController.createOrder);

// Export the router to be used in server.js.
module.exports = router;

