import React from "react";

const ShapeMenu = ({ selectedShape, onAction }) => {
  return (
    <div className="shape-menu">
      <p>Selected Shape: {selectedShape}</p>
      <button onClick={() => onAction("delete")}>Delete</button>
      <button onClick={() => onAction("resize")}>Resize</button>
      <button onClick={() => onAction("color")}>Change Color</button>
    </div>
  );
};

export default ShapeMenu;
