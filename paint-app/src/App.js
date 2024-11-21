import React, { useState } from "react";
import Canvas from "./components/canvas";
import Toolbar from "./components/toolbar";
import ShapeMenu from "./components/shapemenu";

const App = () => {
  const [selectedShape, setSelectedShape] = useState(null);

  const handleShapeSelect = (shapeType) => {
    setSelectedShape(shapeType);
  };

  const handleShapeAction = (actionType) => {
    // Example: Actions like Delete, Resize, etc., can be handled here.
    console.log(`Performing action: ${actionType} on ${selectedShape}`);
  };

  return (
    <div className="App">
      <Toolbar onShapeSelect={handleShapeSelect} />
      <Canvas selectedShape={selectedShape} />
      {selectedShape && (
        <ShapeMenu
          selectedShape={selectedShape}
          onAction={handleShapeAction}
        />
      )}
    </div>
  );
};

export default App;
