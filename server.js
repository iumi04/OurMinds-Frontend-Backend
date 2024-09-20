const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config(); // Load environment variables from .env file

const connectDB = require("./utils/database"); // Import your database connection
const authRoutes = require("./routes/authRoutes"); // Import authentication routes

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse JSON bodies

// Connect to MongoDB --> We are actually going to use the server folder and utilize js packages and connect to mongo api 
connectDB();

// Routes
app.use("/api/auth", authRoutes); // Register the authentication routes

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/api", (req, res) => {
  res.send("API is working. Please use /api/auth for authentication routes.");
});

