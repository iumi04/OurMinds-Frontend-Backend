import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/SideBar';
import Today from "./components/Today/Today"
import Prompts from './components/Prompts/Prompts';
import Calendar from './components/Calendar/Calendar';
import Login from "./components/Login/Login";
import Register from './components/Register/Register';

const auth_URL = process.env.REACT_APP_AUTH_URL;


function App() {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH_URL}            // e.g., 'your-tenant.auth0.com'
      clientId={process.env.REACT_APP_AUTH_CLIENT_ID}       // Auth0 Client ID from your dashboard
      authorizationParams={{
        redirect_uri: window.location.origin // Redirect back to your app after login
      }}
    >
      <div className="App">
        <div className="container-fluid">
          <div className="row">
            <Router>
              <div className="col-md-3 p-0">
                <Sidebar />
              </div>
              <div className="col-md-9 good-evening">
                <Routes>
                  <Route path="/" element={<Today />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </div>
            </Router>
          </div>
        </div>
      </div>
    </Auth0Provider>
  );
}

export default App;
