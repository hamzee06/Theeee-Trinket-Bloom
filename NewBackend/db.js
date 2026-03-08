const mongoose = require('mongoose');
require('dotenv').config();

let isConnected = false;

// MongoDB connection
const connectDB = async () => {
  if (isConnected) {
    console.log('Using existing MongoDB connection');
    return;
  }

  try {
    // Use MONGODB_URI from environment variables
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/trinketbloom';
    
    await mongoose.connect(mongoURI);
    
    isConnected = true;
    console.log('Connected to MongoDB database');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    throw err;
  }
};

// Export the connection function
module.exports = connectDB;
