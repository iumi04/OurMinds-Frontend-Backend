const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Success: Connected to MongoDB');
  } catch (err) {
    console.error('Failure: Unconnected to MongoDB', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;