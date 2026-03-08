const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection
const connectDB = async () => {
  try {
    // Use MONGODB_URI from environment variables
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/trinketbloom';
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Connected to MongoDB database');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  }
};

// Export the connection function
module.exports = connectDB;
