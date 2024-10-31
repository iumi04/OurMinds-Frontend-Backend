import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/SideBar";
import Today from "./components/Today/Today";
import Prompts from "./components/Prompts/Prompts";
import Calendar from "./components/Calendar/Calendar";
import Login from "./components/Login/Login";
import LoginButton from "./components/Login/Login";

function App() {
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row">
          <Router>
            <div className="col-md-3 p-0">
              <Sidebar />
              <LoginButton />{" "}
              {/* Added login button in sidebar - adjust placement as needed */}
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
  );
}

export default App;
