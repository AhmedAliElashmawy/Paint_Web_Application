// src/App.js
import React, { useState, useEffect } from 'react';
import Toolbar from './components/Toolbar';
import Bottombar from './components/Bottombar';
import Canvas from './components/Canvas';
import './App.css';

function App() {
  const [shapes, setShapes] = useState([]);
  const [selectedShape, setSelectedShape] = useState(null);

  return (
    <div className="app-container">
      <Toolbar/>
      <Canvas shapes={shapes} setShapes={setShapes} selectedShape={selectedShape} />
      <Bottombar/>
    </div>
  );
}

export default App;
