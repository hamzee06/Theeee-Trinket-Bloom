const db = require('../db'); // Import the database connection from server.js

// Controller function to get all feedback from the database.
exports.getAllFeedback = (req, res) => {
    const sql = 'SELECT * FROM feedback ORDER BY createdAt DESC';
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json({ data: rows });
    });
};

// Controller function to create new feedback in the database.
exports.createFeedback = (req, res) => {
    // Get data from the request body.
    const { name, email, message } = req.body;

    // Validate that all required fields are present.
    if (!name || !email || !message) {
        res.status(400).json({ error: 'Please provide name, email, and message.' });
        return;
    }

    const sql = 'INSERT INTO feedback (name, email, message) VALUES (?, ?, ?)';
    const params = [name, email, message];

    // Run the SQL command to insert the new feedback.
    db.run(sql, params, function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        // Send a success response with the ID of the new feedback entry.
        res.status(201).json({
            message: 'Feedback created successfully',
            id: this.lastID
        });
    });
};
