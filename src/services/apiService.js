<<<<<<< Updated upstream
import User from "../models/Users.js";
import JournalEntry from '../models/JournalEntry.js';
import jwt from 'jsonwebtoken';
=======
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

// Replace with your JWT secret key (should be stored securely)
const JWT_SECRET = 'your_jwt_secret_key';

const apiService = {
  // Authentication: Register a new user
  register: async (userData) => {
    try {
      const user = new User(userData);
      await user.save();
      console.log('User registered successfully:', user);
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  },

  // Authentication: Login a user and return a JWT token
  login: async (userData) => {
    try {
      const user = await User.findOne({ username: userData.username });
      if (!user) {
        throw new Error('User not found');
      }

      const isPasswordValid = await user.comparePassword(userData.password);
      if (!isPasswordValid) {
        throw new Error('Invalid credentials');
      }

      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
      return token;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  },

  // CREATE: Create a journal entry for a user
  createJournalEntry: async (entryData, userId) => {
    try {
      console.log("Creating journal entry:", entryData);
      const journalEntry = new JournalEntry({
        date: entryData.date || new Date(),
        content: entryData.content,
        user: userId, // Associate the journal entry with the user's ID
      });

      await journalEntry.save();
      console.log("Journal entry saved:", journalEntry);
      return journalEntry;
    } catch (error) {
      console.error("Error creating journal entry:", error);
      throw error;
    }
  },

  // READ: Get journal entry by a specific date
  getJournalEntryByDate: async (date, userId) => {
    try {
      const journalEntry = await JournalEntry.findOne({ date, user: userId });
      if (!journalEntry) {
        throw new Error('No journal entry found for this date');
      }
      return journalEntry;
    } catch (error) {
      console.error("Error fetching journal entry by date:", error);
      throw error;
    }
  },

  // READ: Get the previous journal entry
  getPreviousJournalEntry: async (userId) => {
    try {
      const journalEntry = await JournalEntry.findOne({ user: userId }).sort({ date: -1 });
      if (!journalEntry) {
        throw new Error('No previous journal entry found');
      }
      return journalEntry;
    } catch (error) {
      console.error("Error fetching previous journal entry:", error);
      throw error;
    }
  },
};

export default apiService;