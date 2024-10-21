const mongoose = require("mongoose");
require("dotenv").config({path: "./server/config.env"}) //access for dotenv library and to use config.env for environmental variables

// Replace with your MongoDB connection string
const url = process.env.ATLAS_URI;
console.log("MongoDB Connection URL:", url); // Log the connection string
// Connect to MongoDB
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    // Call the function to test Mongoose
    testMongoose();
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });

// Define a simple schema and model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// Function to test Mongoose
async function testMongoose() {
  try {
    // Create a new user
    const newUser = new User({ username: "testUser", password: "testPassword" });
    await newUser.save();
    console.log("User created:", newUser);

    // Retrieve the user
    const foundUser = await User.findOne({ username: "testUser" });
    console.log("User found:", foundUser);

    // Clean up: remove the test user
    await User.deleteOne({ username: "testUser" });
    console.log("Test user deleted");

    // Close the connection
    mongoose.connection.close();
  } catch (err) {
    console.error("Error during Mongoose test:", err);
  }
}