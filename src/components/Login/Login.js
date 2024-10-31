import React from 'react';
import './Login.css';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from "react-router-dom";

export default function Login() {
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

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