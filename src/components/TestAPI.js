// src/components/TestAPI.js
import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function TestAPI() {
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const testAPI = async () => {
      try {
        // Get the token
        const token = await getAccessTokenSilently();
        console.log(">>> Got token:", token);

        // Test the /test endpoint
        const testResponse = await fetch('/api/test', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const testData = await testResponse.json();
        console.log(">>> Test endpoint response:", testData);

        // Test the /entries endpoint
        const entriesResponse = await fetch('/api/entries', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const entriesData = await entriesResponse.json();
        console.log(">>> Entries endpoint response:", entriesData);

      } catch (error) {
        console.error(">>> API test error:", error);
      }
    };

    testAPI();
  }, [getAccessTokenSilently]);

  return <div>Check console for API test results</div>;
}

export default TestAPI;