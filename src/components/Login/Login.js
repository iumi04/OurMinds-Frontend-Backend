import React, { useState } from 'react';
import './Login.css';
import apiService from '../../services/apiService';
import { useAuth0 } from '@auth0/auth0-react';



export default function Login() {
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

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