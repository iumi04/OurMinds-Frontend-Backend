import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar/SideBar";
import Today from "./components/Today/Today";
import Prompts from "./components/Prompts/Prompts";
import Calendar from "./components/Calendar/Calendar";
import Login from "./components/Login/Login";
import LoginButton from "./components/Login/Login";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row">
          <Router>
            <div className="col-md-3 p-0">
              <Sidebar />
              <LoginButton />
            </div>
            <div className="col-md-9 good-evening">
              <Routes>
                <Route 
                  path="/login" 
                  element={isAuthenticated ? <Navigate to="/" /> : <Login />} 
                />
                <Route path="/" element={<Today />} />
              </Routes>
            </div>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
