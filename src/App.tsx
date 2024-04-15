import React from "react";
import "./style/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import SelectionLevels from "./SelectionLevels";
import Languages from "./Languages";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/selectionLevels" element={<SelectionLevels />} />
        <Route path="/selectLanguages" element={<Languages />} />
      </Routes>
    </Router>
  );
};

export default App;
