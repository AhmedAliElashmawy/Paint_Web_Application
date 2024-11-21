import React, { useState } from "react";
import { Stage, Layer, Circle, Rect, Ellipse, Line } from "react-konva";

const Canvas = ({ selectedShape }) => {
  const [shapes, setShapes] = useState([]);

  const handleAddShape = () => {
    if (!selectedShape) return;

    const newShape = {
      id: Date.now(),
      type: selectedShape,
      x: 100,
      y: 100,
      color: "black",
    };

    if (selectedShape === "circle") {
      newShape.radius = 30;
    } else if (selectedShape === "rectangle") {
      newShape.width = 100;
      newShape.height = 50;
    } else if (selectedShape === "ellipse") {
      newShape.radiusX = 50;
      newShape.radiusY = 30;
    } else if (selectedShape === "line") {
      newShape.points = [100, 100, 200, 200];
    }

    setShapes([...shapes, newShape]);
  };

  return (
    <div>
      <button onClick={handleAddShape}>Add {selectedShape}</button>
      <Stage width={800} height={600} style={{ border: "1px solid black" }}>
        <Layer>
          {shapes.map((shape) => {
            if (shape.type === "circle") {
              return (
                <Circle
                  key={shape.id}
                  x={shape.x}
                  y={shape.y}
                  radius={shape.radius}
                  fill={shape.color}
                  draggable
                />
              );
            } else if (shape.type === "rectangle") {
              return (
                <Rect
                  key={shape.id}
                  x={shape.x}
                  y={shape.y}
                  width={shape.width}
                  height={shape.height}
                  fill={shape.color}
                  draggable
                />
              );
            } else if (shape.type === "ellipse") {
              return (
                <Ellipse
                  key={shape.id}
                  x={shape.x}
                  y={shape.y}
                  radiusX={shape.radiusX}
                  radiusY={shape.radiusY}
                  fill={shape.color}
                  draggable
                />
              );
            } else if (shape.type === "line") {
              return (
                <Line
                  key={shape.id}
                  points={shape.points}
                  stroke={shape.color}
                  strokeWidth={2}
                  draggable
                />
              );
            }
            return null;
          })}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
