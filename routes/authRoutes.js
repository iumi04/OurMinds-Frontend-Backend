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

router.post("/insert", async (req, res) => {
  console.log("Received request body:", req.body);
  const newDocument = req.body;
  
  try {
    if (!client) {
      console.error("Database client is not connected");
      return res.status(500).json({ 
        error: "Database connection not established",
        details: "MongoDB client is not initialized"
      });
    }

    // Get user info from Auth0 token
    const userId = req.auth.payload.sub; // Auth0 user ID
    newDocument.userId = userId; // Add user ID to document

    const db = client.db("App");
    const collection = db.collection("entries");
    
    console.log("Attempting to insert document:", newDocument);
    const result = await collection.insertOne(newDocument);
    console.log("Insert operation result:", result);
    
    res.status(201).json({ 
      id: result.insertedId,
      message: "Document inserted successfully" 
    });

  } catch (e) {
    console.error("Detailed database error:", e);
    res.status(500).json({ 
      error: "Error inserting document", 
      details: e.message,
      stack: process.env.NODE_ENV === 'development' ? e.stack : undefined
    });
  }
});

router.get("/test", jwtCheck, (req, res) => {
  res.json({
    message: "Test route is working!",
    user: req.auth.payload
  });
});

router.get("/entries", async (req, res) => {
  try {
    if (!client) {
      console.error("Database client is not connected");
      return res.status(500).json({ 
        error: "Database connection not established",
        details: "MongoDB client is not initialized"
      });
    }

    const userId = req.auth.payload.sub;
    const db = client.db("App");
    const collection = db.collection("entries");
    
    console.log("Fetching entries for user:", userId);
    const entries = await collection.find({ userId: userId }).toArray();
    console.log("Found entries:", entries.length);
    
    res.json(entries);

  } catch (e) {
    console.error("Error fetching entries:", e);
    res.status(500).json({ 
      error: "Error fetching entries", 
      details: e.message,
      stack: process.env.NODE_ENV === 'development' ? e.stack : undefined
    });
  }
});

module.exports = router;