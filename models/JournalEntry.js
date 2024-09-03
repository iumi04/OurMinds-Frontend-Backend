// models/JournalEntry.js
const mongoose = require('mongoose');

const journalEntrySchema = new mongoose.Schema({
  date: { type: Date, required: true },
  reflection: { type: String, required: true },
  mindfulness: { type: String, required: true },
  gratitude: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('JournalEntry', journalEntrySchema);