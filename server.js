//connect the mongodb backend to node.js to express??


const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config(); // Load environment variables from .env file

const connectDB = require("./server/connect.cjs"); // Import your database connection, changed from database to connect.cjs
const authRoutes = require("./routes/authRoutes.js"); // Import authentication routes

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse JSON bodies

connectDB(); //just kidding we need this

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

