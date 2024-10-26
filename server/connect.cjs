const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
require("dotenv").config({path: "./config.env"});

const uri = process.env.ATLAS_URI;

if (!uri) {
  console.error('ATLAS_URI is not defined in the environment variables');
  process.exit(1);
}

console.log("Connection string (redacted):", uri.replace(/:[^@/]+@/, ':****@'));

const client = new MongoClient(uri);

async function connectDB() {
  try {
    console.log("Attempting to connect to MongoDB...");
    await client.connect();
    console.log("Connected successfully to MongoDB using MongoClient!");

    console.log("Attempting to connect using Mongoose...");
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected successfully to MongoDB using Mongoose!");

    const db = client.db();
    console.log("Connected to database:", db.databaseName);
  } catch (e) {
    console.error("Error connecting to MongoDB:", e);
    throw e;
  }
}

module.exports = { connectDB, client };