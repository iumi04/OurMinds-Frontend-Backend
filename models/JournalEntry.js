// models/JournalEntry.js
const express = require("express");
const router = express.Router();

router.post("/entries", async (req, res) => {
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

module.exports = router;
