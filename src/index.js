import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";
import config from './auth_config.json';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-ujppivpjk6se3qer.us.auth0.com"
      clientId="wgLGxyLyQwEUtSaXJ6r03lPPwUa3csq9"
      authorizationParams={{
        redirect_uri: `${config.urls.frontend}/login`,
        audience: config.urls.api
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);

reportWebVitals();