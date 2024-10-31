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
import Sidebar from "./components/Sidebar/SideBar"; // Fixed import to match casing
import Today from "./components/Today/Today";
import Prompts from "./components/Prompts/Prompts";
import Calendar from "./components/Calendar/Calendar";
import Login from "./components/Login/Login";
import LoginButton from "./components/Login/Login"; // Adjusted for clarity

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row">
          <Router>
            <Routes>
              {/* Route to check if on login page */}
              <Route
                path="/login"
                element={isAuthenticated ? <Navigate to="/" /> : <Login />}
              />
              {/* Add all routes here to determine layout */}
              <Route
                path="/"
                element={
                  <div className="col-md-3 p-0">
                    <Sidebar />
                    <LoginButton />
                  </div>
                }
              />

              {/*NOTE FOR BUM DEVELOPER (WESLEY) AND BUM (HAKU) LEAVE BELOW 2 LINES COMMENTED OUT THIS FOR LATER*/}
              {/* <Route path="/prompts" element={<Prompts />} />
              <Route path="/calendar" element={<Calendar />} /> */}
            </Routes>
            {/* Main content should always be shown, even on login */}
            <div className="col-md-9 good-evening">
              <Routes>
                <Route path="/" element={<Today />} />
                {/* Add additional routes if necessary */}
              </Routes>
            </div>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
