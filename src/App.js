import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import ProjectDisplay from "./pages/ProjectDisplay";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import React from 'react';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />}  key={1}/>
          <Route path="/experience" element={<Experience />}  key={2}/>
          <Route path="/project/:id" element={<ProjectDisplay  key={3}/>}/>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
