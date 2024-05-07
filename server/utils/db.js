// server/utils/db.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://saikrishnachippa3:saikrishna@brain-op.27swcsg.mongodb.net/brainop?retryWrites=true&w=majority&appName=brain-op", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
