import React from "react";

const shapes = ["Rectangle", "Circle", "Triangle"];

const Shapemenue = ({ onShapeSelect }) => {
  return (
    <div style={{ padding: "10px", borderRight: "1px solid gray" }}>
      <h3>Shapes</h3>
      {shapes.map((shape) => (
        <button
          key={shape}
          onClick={() => onShapeSelect(shape)}
          style={{ display: "block", margin: "5px 0" }}
        >
          <img
    src={`/icons/${shape.label.toLowerCase()}.svg`}
    alt={shape}
    style={{ width: "20px", height: "20px", marginRight: "10px" }}
  />{shape}
        </button>
      ))}
    </div>
  );
};

export default Shapemenue;