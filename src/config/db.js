const mongoose = require('mongoose');

const connectDB = async () => {
  try {  
    console.log('MongoDB connection string:', process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    // await mongoose.connect(URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
  }
};

module.exports = connectDB;
