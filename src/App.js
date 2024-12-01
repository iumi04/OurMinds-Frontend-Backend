import React from "react";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Sidebar from "./components/Sidebar/SideBar";
import Today from "./components/Today/Today";
import Prompts from "./components/Prompts/Prompts";
import Calendar from "./components/Calendar/Calendar";
import Login from "./components/Login/Login";
import LoginButton from "./components/Login/Login";
import TestAPI from "./components/TestAPI"; // Add this import
import config from './auth_config.json';

// Create a protected route wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row">
          <Router>
            <Routes>
              {/* Login route */}
              <Route
                path="/login"
                element={isAuthenticated ? <Navigate to="/" /> : <Login />}
              />

              {/* Test API route */}
              <Route
                path="/test-api"
                element={
                  <ProtectedRoute>
                    <div className="col-md-12">
                      <TestAPI />
                    </div>
                  </ProtectedRoute>
                }
              />

              {/* Main layout routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <div className="col-md-3 p-0">
                      <Sidebar />
                      <LoginButton />
                    </div>
                  </ProtectedRoute>
                }
              />

              {/*NOTE FOR BUM DEVELOPER (WESLEY) AND BUM (HAKU) LEAVE BELOW 2 LINES COMMENTED OUT THIS FOR LATER*/}
              {/* <Route path="/prompts" element={<Prompts />} />
              <Route path="/calendar" element={<Calendar />} /> */}
            </Routes>

            {/* Main content */}
            <div className="col-md-9 good-evening">
              <Routes>
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Today />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
          </Router>
        </div>
      </div>
    </div>
  );
}

// Wrap the app with Auth0Provider
function AppWithAuth() {
  return (
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
  );
}

export default AppWithAuth;