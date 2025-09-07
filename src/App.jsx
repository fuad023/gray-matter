import React from "react";
import { Routes, BrowserRouter as Router, Route, Link } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./components/Home";
import About from "./components/About";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element = { <Home/> } />
          <Route path="/about" element = { <About/> } />
        </Routes>
      </Router>
    </>
  );
}

export default App;
