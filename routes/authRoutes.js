const express = require("express");
const router = express.Router();
const JournalEntry = require("../models/JournalEntry");
const { connectDB, client } = require("../server/connect.cjs");
const { auth } = require('express-oauth2-jwt-bearer');

// Auth0 middleware configuration
const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER,
  tokenSigningAlg: 'RS256'
});

// Protect routes that require authentication
router.use(jwtCheck);

// Middleware to ensure user exists
// getting user id directly from auth0 /// ASK UMI
const ensureUser = async (req, res, next) => {
  try {
    const userId = req.auth.payload.sub;
    const db = client.db("App");
    const usersCollection = db.collection("users");
    
    console.log("the unique user id is: ", userId);
    // Try to find user
    const user = await usersCollection.findOne({ userId: userId });
    
    // If user doesn't exist, create them
    if (!user) {
      console.log("Creating new user:", userId);
      const newUser = {
        userId: userId,
        email: req.auth.payload.email,
        createdAt: new Date(),
        lastLogin: new Date()
      };
      await usersCollection.insertOne(newUser);
    }
    
    next();
  } catch (error) {
    console.error("Error in ensureUser middleware:", error);
    res.status(500).json({ error: "Error processing user" });
  }
};

// Apply ensureUser middleware to all routes
router.use(ensureUser);

// Enhanced logging for test route
router.get("/test", async (req, res) => {
  console.log(">>> Test route hit");
  console.log(">>> Auth payload:", req.auth.payload);
  res.json({
    message: "Test route is working!",
    user: req.auth.payload,
    userId: req.auth.payload.sub
  });
});

// Enhanced entries route with detailed logging
router.get("/entries", async (req, res) => {
  console.log(">>> Entries route hit");
  try {
    if (!client) {
      console.error(">>> Database client is not connected");
      return res.status(500).json({ 
        error: "Database connection not established"
      });
    }

    const userId = req.auth.payload.sub;
    console.log(">>> Authenticated user ID:", userId);
    
    const db = client.db("App");
    const collection = db.collection("entries");
    
    console.log(">>> Fetching entries for user:", userId);
    const entries = await collection.find({ userId: userId }).toArray();
    console.log(">>> Found entries:", entries);
    
    res.json(entries);
  } catch (e) {
    console.error(">>> Error in /entries route:", e);
    res.status(500).json({ 
      error: "Error fetching entries", 
      details: e.message
    });
  }
});

// Enhanced insert route
router.post("/insert", async (req, res) => {
  console.log(">>> Insert route hit");
  console.log(">>> Received request body:", req.body);
  
  try {
    if (!client) {
      console.error(">>> Database client is not connected");
      return res.status(500).json({ 
        error: "Database connection not established"
      });
    }

    const userId = req.auth.payload.sub;
    const newDocument = {
      ...req.body,
      userId,
      createdAt: new Date()
    };

    console.log(">>> Attempting to insert document:", newDocument);
    
    const db = client.db("App");
    const collection = db.collection("entries");
    const result = await collection.insertOne(newDocument);
    
    console.log(">>> Insert operation result:", result);
    
    res.status(201).json({ 
      id: result.insertedId,
      message: "Document inserted successfully" 
    });

  } catch (e) {
    console.error(">>> Error in insert route:", e);
    res.status(500).json({ 
      error: "Error inserting document", 
      details: e.message
    });
  }
});

module.exports = router;