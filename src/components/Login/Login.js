import React, { useEffect, useState } from 'react';
import './Login.css';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from "react-router-dom";

export default function Login() {
  const { loginWithRedirect, isAuthenticated, user, logout, getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const getToken = async () => {
      if (isAuthenticated) {
        try {
          const accessToken = await getAccessTokenSilently();
          setToken(accessToken);
          console.log("JWT Token:", accessToken); // Log the token for debugging
          localStorage.setItem('token', accessToken); // Store the token in localStorage
        } catch (error) {
          console.error("Error getting access token", error);
        }
      }
    };

    getToken();
  }, [isAuthenticated, getAccessTokenSilently]);

  // If authenticated, redirect to home page
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If not authenticated, show login page content
  return (
    <div className="login-wrapper">
      <h1>{isAuthenticated ? `Welcome, ${user?.nickname}! 🎉` : 'Please Log In 🙏'}</h1>
      <div>
        {isAuthenticated ? (
          <button onClick={() => logout({ returnTo: window.location.origin })}>
            Log Out
          </button>
        ) : (
          <button onClick={() => loginWithRedirect()}>
            Log In with Auth0
          </button>
        )}
      </div>
    </div>
  );
}