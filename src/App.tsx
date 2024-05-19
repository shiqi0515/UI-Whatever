import React from "react";
import "./style/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import SelectionLevels from "./SelectionLevels";
import Languages from "./Languages";
import TutorialLevel from "./levels/TutorialLevel";

const App: React.FC = () => {
  return (
    <div className="app-container"> 
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/selectionLevels" element={<SelectionLevels />} />
        <Route path="/selectLanguages" element={<Languages />} />
        <Route path="/tutorialLevel" element={<TutorialLevel />} />
      </Routes>
    </Router>
    </div>
  );
};

export default App;
