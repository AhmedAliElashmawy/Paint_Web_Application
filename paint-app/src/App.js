// src/App.js
import React, { useState, useEffect } from 'react';
import Toolbar from './components/Toolbar';
import Bottombar from './components/Bottombar';
import Canvas from './components/Canvas';
import './App.css';
import './services/api.js'

function App() {
  const [shapes, setShapes] = useState([]);
  const [selectedShape, setSelectedShape] = useState(null);
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [selectedSize, setSelectedSize] = useState(1);

  return (
    <div className="app-container">
      <Toolbar
        selectedShape={selectedShape}
        onShapeSelect={setSelectedShape}
        selectedColor={selectedColor}
        onColorSelect={setSelectedColor}
        selectedSize={selectedSize}
        onSizeChange={setSelectedSize}
      />
      <Canvas
        shapes={shapes}
        setShapes={setShapes}
        selectedShape={selectedShape}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
      />
      <Bottombar/>
    </div>
  );
}

export default App;
