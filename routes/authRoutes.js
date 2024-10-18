//another test file.. for Login system -- Umi

const express = require("express");
const router = express.Router();
const JournalEntry = require("../JournalEntry.js");
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
    await newUser.save();

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
  const newDocument = req.body; // Get the document from the request body
  try {
      const db = client.db("App"); // Access the database
      const collection = db.collection("entries"); // Access the collection
      
      //const result = await collection.insertOne(newDocument); // Insert the document
      //console.log("Document inserted with _id:", result.insertedId); // Log the inserted ID
      //res.status(201).send({ id: result.insertedId }); // Send back the inserted ID
      const result = await apiService.createJournalEntry(newDocument); // Use the existing function
      console.log("Document inserted with _id:", result._id); // Log the inserted ID
      res.status(201).send({ id: result._id }); // Send back the inserted ID
  
  } catch (e) {
      console.error(e);
      res.status(500).send("Error inserting document"); // Send error response
  }
});

router.get("/test", (req, res) => {
  res.send("Test route is working!");
});

module.exports = router;

console.log("JWT_SECRET:", process.env.JWT_SECRET);
