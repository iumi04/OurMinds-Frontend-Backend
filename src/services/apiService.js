import axios from 'axios';

const API_BASE_URL = 'https://localhost:3001/api';



const apiService = {
  // Authentication added here for login system (TEST) -- Umi
  register: async (userData) => {
    try {
      await axios.post(`${API_BASE_URL}/auth/register`, userData);
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  },

  login: async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, userData);
      return response.data.token;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  },

  // CREATE
  // Create prompts in Prompts page

  // create journalentry in today's page
  createJournalEntry: async (entryData) => {
    try {
      console.log("Sending journal entry data:", entryData);
      const response = await axios.post(
        `${API_BASE_URL}/journal-entries`,  //references ATLAS_URI in config.env
        entryData
      );
      console.log("Server response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating journal entry:", error);
      if (error.response) {
        console.error("Error data:", error.response.data);
        console.error("Error status:", error.response.status);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
      throw error;
    }
  },

  getJournalEntryByDate: async (date) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/journal-entries/byDate/${date}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching journal entry by date:", error);
      throw error;
    }
  },

  // READ
  // Read multiple prompts for that day

  // Read previous journal
  getPreviousJournalEntry: async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/journal-entries/previous`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching previous journal entry:", error);
      throw error;
    }
  },
};

export default apiService;