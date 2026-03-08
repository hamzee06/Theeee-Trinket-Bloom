const Feedback = require('../models/Feedback');

// Controller function to get all feedback from the database.
exports.getAllFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.find().sort({ createdAt: -1 });
        res.status(200).json({ data: feedback });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Controller function to create new feedback in the database.
exports.createFeedback = async (req, res) => {
    const { name, email, message } = req.body;

    // Validate that all required fields are present.
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Please provide name, email, and message.' });
    }

    try {
        const newFeedback = new Feedback({
            name,
            email,
            message
        });

        const savedFeedback = await newFeedback.save();
        
        res.status(201).json({
            message: 'Feedback created successfully',
            id: savedFeedback._id
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
