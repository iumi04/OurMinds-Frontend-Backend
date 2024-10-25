//connect the mongodb backend to node.js to express??
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config({path: "./server/config.env"}) //access for dotenv library and to use config.env for environmental variables

const {connectDB, client} = require("./connect.cjs");
const authRoutes = require("../routes/authRoutes.js");
const app = express();
const { auth } = require('express-openid-connect');
const http = require("http");
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH_SECRET, // Updated to use process.env
  baseURL: process.env.AUTH_BASE_URL, // Updated to use process.env
  clientID: process.env.AUTH_CLIENT_ID, // Updated to use process.env
  issuerBaseURL: process.env.AUTH_URL // Updated to use process.env
};

const port = process.env.PORT || 3000;

// Dynamic baseURL setting with debug
if (!config.baseURL && !process.env.BASE_URL && process.env.PORT && process.env.NODE_ENV !== 'production') {
  config.baseURL = `http://localhost:${port}`;
  console.log('Dynamic baseURL set to:', config.baseURL);
}

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Add error handling for database connection
connectDB().catch(error => {
  console.error('Database Connection Error:', error);
});


// Add error handling for user middleware
app.use(function (req, res, next) {
  try {
    res.locals.user = req.oidc.user;
    next();
  } catch (error) {
    console.error('User Middleware Error:', error);
    next(error);
  }
});

// Routes with error handling

app.get("/api", (req, res) => {
  console.log("GET /api route hit");
  res.send("API is working. Please use /api/auth for authentication routes.");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global Error Handler:', {
    message: err.message,
    stack: err.stack,
    url: req.url
  });
  res.status(500).json({
    error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message,
    path: req.url
  });
});

// Server start with error handling
http.createServer(app)
  .listen(port, () => {
    console.log(`Server started successfully`);
    console.log(`Listening on ${config.baseURL}`);
    console.log('Server Configuration:', {
      port,
      baseURL: config.baseURL,
      environment: process.env.NODE_ENV || 'development'
    });
  })
  .on('error', (error) => {
    console.error('Server Start Error:', error);
  });