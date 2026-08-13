const { getDb, ensureFeedbackTable } = require('../db');

// Controller function to get all feedback from the database.
exports.getAllFeedback = async (req, res) => {
    try {
        await ensureFeedbackTable();
        const result = await getDb().execute('SELECT * FROM feedback ORDER BY createdAt DESC');
        res.status(200).json({ data: result.rows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Controller function to create new feedback in the database.
exports.createFeedback = async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        res.status(400).json({ error: 'Please provide name, email, and message.' });
        return;
    }

    try {
        await ensureFeedbackTable();
        const result = await getDb().execute({
            sql: 'INSERT INTO feedback (name, email, message) VALUES (?, ?, ?)',
            args: [name, email, message],
        });

        res.status(201).json({
            message: 'Feedback created successfully',
            id: Number(result.lastInsertRowid)
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
