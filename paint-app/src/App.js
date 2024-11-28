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
  const [selectedFill, setSelectedFill] = useState(false);
  const [selectedPencil, setSelectedPencil] = useState(false);
  const [selectedBrush, setSelectedBrush] = useState(false);
  const [selectedEraser, setSelectedEraser] = useState(false);
  const [selectedAirbrush, setSelectedAirbrush] = useState(false);
  const [selectedFloodFill, setSelectedFloodFill] = useState(false);

  return (
    <div className="app-container">
      <Toolbar
        selectedShape={selectedShape}
        onShapeSelect={setSelectedShape}
        selectedColor={selectedColor}
        onColorSelect={setSelectedColor}
        selectedSize={selectedSize}
        onSizeChange={setSelectedSize}
        selectedFill={selectedFill}
        setFillSelect={setSelectedFill}
        selectedPencil={selectedPencil}
        setselectedPencil={setSelectedPencil}
        selectedBrush={selectedBrush}
        setselectedBrush={setSelectedBrush}
        selectedEraser={selectedEraser}
        setselectedEraser={setSelectedEraser}
        selectedAirbrush={selectedAirbrush}
        setselectedAirbrush={setSelectedAirbrush}
        selectedFloodFill={selectedFloodFill}
        setselectedFloodFill={setSelectedFloodFill}
        />
      <Canvas
        shapes={shapes}
        setShapes={setShapes}
        selectedShape={selectedShape}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
        selectedFill={selectedFill}
        selectedPencil={selectedPencil}
        selectedBrush={selectedBrush}
        selectedEraser={selectedEraser}
        selectedAirbrush={selectedAirbrush}
        selectedFloodFill={selectedFloodFill}
        />
      <Bottombar/>
    </div>
  );
}

export default App;
