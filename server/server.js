//connect the mongodb backend to node.js to express??


const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config(); // Load environment variables from .env file

const {connectDB, client} = require("./connect.cjs"); // Import your database connection, changed from database to connect.cjs
const authRoutes = require("../routes/authRoutes.js"); // Import authentication routes
const app = express();
const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: auth_secret,
  baseURL: auth_baseURL,
  clientID: auth_clientID,
  issuerBaseURL: auth_URL
};

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse JSON bodies
app.use(express.json()); // Middleware to parse JSON bodies


connectDB(); //just kidding we need this

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// Routes
app.use("/api/auth", authRoutes); // Register the authentication routes

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/api", (req, res) => {
  console.log("GET /api route hit"); // Log when the route is accessed
  res.send("API is working. Please use /api/auth for authentication routes.");
});

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});