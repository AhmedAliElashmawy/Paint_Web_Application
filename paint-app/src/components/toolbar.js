import React from "react";

const Toolbar = ({ onShapeSelect }) => {
  return (
    <div className="toolbar">
      <button onClick={() => onShapeSelect("circle")}>Circle</button>
      <button onClick={() => onShapeSelect("rectangle")}>Rectangle</button>
      <button onClick={() => onShapeSelect("ellipse")}>Ellipse</button>
      <button onClick={() => onShapeSelect("line")}>Line</button>
    </div>
  );
};

export default Toolbar;
