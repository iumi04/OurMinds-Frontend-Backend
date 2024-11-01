import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';


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
      console.log("Attempting to send entry data:", entryData);
      const response = await axios.post(
        `${API_BASE_URL}/auth/insert`,
        entryData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      console.log("Server response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Full error object:", error);
      console.error("Error creating journal entry:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
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