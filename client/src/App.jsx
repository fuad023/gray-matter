import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


import Auth from "./auth_layout/Auth";
import MainLayout from "./main_layout/MainLayout";
import LoginReg from "./LoginReg";
import Home from "./components/Home";
import About from "./components/About";

function App() {
  return (
    <Router>
      <Routes>
       
        <Route element={<Auth/>}>
          <Route path="/login" element={<LoginReg/>} />
        </Route>
        <Route element={<MainLayout/>}>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
