const db = require('../db');

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
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        res.status(400).json({ error: 'Please provide name, email, and message.' });
        return;
    }

    const sql = 'INSERT INTO feedback (name, email, message) VALUES (?, ?, ?)';
    const params = [name, email, message];

    db.run(sql, params, function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({
            message: 'Feedback created successfully',
            id: this.lastID
        });
    });
};
