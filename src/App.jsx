import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import ReportGenerator from "./components/ReportGenerator";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/report" element={<ReportGenerator />} />
      </Routes>
      <Footer/>
    </Router>
  );
}
