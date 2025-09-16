import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Auth from "./auth_layout/Auth";
import MainLayout from "./main_layout/MainLayout";
import LoginReg from "./LoginReg";
import Home from "./components/Home";
import About from "./components/About";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";
// import Profile from "./Profile/Profile";
import Suggest from "./components/follow/Suggest";
import ProfilePage from "./components/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PublicRoute/>}>
          <Route element={<Auth />}>
            <Route path="/login" element={<LoginReg />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute/>}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/profilepage" element={<ProfilePage />} />
            <Route path="/suggest" element={<Suggest />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
