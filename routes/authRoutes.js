//another test file.. for Login system -- Umi

const express = require("express");
const router = express.Router();
const JournalEntry = require("../models/JournalEntry");
const User = require("../models/Users"); // Import the User model
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { connectDB, client } = require("../server/connect.cjs"); // Import the connectDB function


// User Registration
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password and create the user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    //need to log this for debugging
    console.log("Creating new user:", newUser);

    await newUser.save();
    console.log("User created successfully:", newUser);

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// User Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Check the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/insert", async (req, res) => {
  console.log("Received request body:", req.body); // Log incoming data
  const newDocument = req.body;
  
  try {
      if (!client) {
          console.error("Database client is not connected");
          return res.status(500).json({ 
              error: "Database connection not established",
              details: "MongoDB client is not initialized"
          });
      }

      const db = client.db("App");
      const collection = db.collection("entries");
      
      console.log("Attempting to insert document:", newDocument); // Log pre-insertion
      const result = await collection.insertOne(newDocument);
      console.log("Insert operation result:", result); // Log full result
      
      res.status(201).json({ 
          id: result.insertedId,
          message: "Document inserted successfully" 
      });
  
  } catch (e) {
      console.error("Detailed database error:", e); // More detailed error logging
      res.status(500).json({ 
          error: "Error inserting document", 
          details: e.message,
          stack: process.env.NODE_ENV === 'development' ? e.stack : undefined
      });
  }
});

router.get("/test", (req, res) => {
  res.send("Test route is working!");
});

module.exports = router;

console.log("JWT_SECRET:", process.env.JWT_SECRET);
