const express = require('express');
const router = express.Router();
// Correct path to the new controller
const orderController = require('../Controllers/oderController'); 

// Define the routes for orders.

// GET route to retrieve all orders.
router.get('/', orderController.getAllOrders);

// POST route to create a new order.
router.post('/', orderController.createOrder);

// Export the router to be used in server.js.
module.exports = router;

