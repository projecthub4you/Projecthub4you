// config/db.js — MongoDB connection using Mongoose
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`⚠️  MongoDB not connected: ${error.message}`);
    console.error('   API routes requiring DB will fail, but server stays running.');
  }
};

module.exports = connectDB;
