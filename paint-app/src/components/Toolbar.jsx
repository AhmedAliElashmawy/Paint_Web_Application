// src/components/Toolbar.jsx
import React from 'react';

const Toolbar = ({ setShapes, shapes }) => {
  const handleUndo = () => {
    if (shapes.length > 0) setShapes(shapes.slice(0, -1));
  };

  const handleClear = () => {
    setShapes([]);
  };

  return (
    <div className="toolbar">
      <button onClick={handleUndo}>Undo</button>
      <button onClick={handleClear}>Clear</button>
      <button>Save</button>
      <button>Load</button>
    </div>
  );
};

export default Toolbar;
