import './style/App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Level0 from './levels/level0';
import HomePage from './HomePage';
import SelectionLevels from './SelectionLevels';
import Languages from './Languages';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/level0" element={<Level0 />} />
        <Route path="/selectionLevels" element={<SelectionLevels />} />
        <Route path="/selectLanguages" element={<Languages />} />
      </Routes>
    </Router>
  );
}

export default App;
