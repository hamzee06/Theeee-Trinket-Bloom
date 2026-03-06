const express = require('express');
const router = express.Router();
const feedbackController = require('../Controllers/feedbackController'); // Import the controller we will create next

// Define the routes for feedback.

// GET route to retrieve all feedback.
// When a GET request is made to '/api/feedback', this calls the getAllFeedback function.
router.get('/', feedbackController.getAllFeedback);

// POST route to create new feedback.
// When a POST request is made to '/api/feedback', this calls the createFeedback function.
router.post('/', feedbackController.createFeedback);

// Export the router to be used in server.js.
module.exports = router;
