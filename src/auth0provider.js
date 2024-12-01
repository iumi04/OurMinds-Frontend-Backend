import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

const root = createRoot(document.getElementById('root'));

root.render(
<Auth0Provider
    domain="dev-ujppivpjk6se3qer.us.auth0.com"
    clientId="mtM5Whv724CgDLVBNOmy2Ic4noHqLLTB"
    authorizationParams={{
      redirect_uri: `${config.urls.frontend}/login`,
      audience: config.urls.api
    }}
  >
    <App />
  </Auth0Provider>,
);