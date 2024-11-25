import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const API_BASE_URL = 'http://localhost:3001/api';

export const useApiService = () => {  
  return{
  createJournalEntry: async (entryData, token) => {
    try {
      console.log("Attempting to send entry data:", entryData);
      const response = await axios.post(
        `${API_BASE_URL}/auth/insert`,
        entryData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
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

  getJournalEntryByDate: async (date, token) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/auth/entries`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching journal entry:", error);
      throw error;
    }
  },
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
    verifyToken: async (token) => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/verify-token`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        return response.data;
      } catch (error) {
        console.error("Error verifying token:", error);
        throw error;
      }
    }
  }
};


export default useApiService;