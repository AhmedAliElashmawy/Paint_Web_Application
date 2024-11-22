// src/App.js
import React, { useState } from 'react';
import Toolbar from './components/Toolbar';
import ShapeMenu from './components/Shapemenu.';
import Canvas from './components/Canvas';
import './App.css';

function App() {
  const [shapes, setShapes] = useState([]);
  const [selectedShape, setSelectedShape] = useState(null);

  return (
    <div className="app-container">
      <Toolbar setShapes={setShapes} shapes={shapes} />
      <ShapeMenu setSelectedShape={setSelectedShape} />
      <Canvas shapes={shapes} setShapes={setShapes} selectedShape={selectedShape} />
    </div>
  );
}

export default App;
