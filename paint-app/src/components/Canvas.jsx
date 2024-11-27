import React, { useRef, useState } from "react";
import { Stage, Layer, Circle, Rect, Line, Transformer } from "react-konva";

const Canvas = ({ shapes, setShapes, selectedShape, selectedColor, selectedSize }) => {
  const [selectedId, setSelectedId] = useState(null); // Tracks the currently selected shape
  const stageRef = useRef(null); // Reference to the canvas stage

  // Add a new shape to the canvas
  const handleCanvasClick = (e) => {
    const stage = e.target.getStage();
    const pointerPosition = stage.getPointerPosition();

    if (selectedShape) {
      const newShape = {
        id: Date.now(), // Unique ID for the shape
        type: selectedShape,
        x: pointerPosition.x,
        y: pointerPosition.y,
        size: selectedSize || 50, // Default size
        color: selectedColor || "blue", // Default color
      };

      setShapes([...shapes, newShape]);
    }
  };

  // Update the position of a shape after dragging
  const handleDragEnd = (id, e) => {
    const updatedShapes = shapes.map((shape) =>
      shape.id === id
        ? { ...shape, x: e.target.x(), y: e.target.y() }
        : shape
    );
    setShapes(updatedShapes);
  };

  // Highlight the selected shape and make it resizable
  const handleShapeSelect = (id) => {
    setSelectedId(id);
  };

  const handleTransformerChange = (id, node) => {
    const updatedShapes = shapes.map((shape) =>
      shape.id === id
        ? { ...shape, x: node.x(), y: node.y(), size: node.width() }
        : shape
    );
    setShapes(updatedShapes);
  };

  return (
    <div>
      <Stage
        ref={stageRef}
        width={1919}
        height={800}
        onClick={(e) => {
          if (e.target === e.target.getStage()) setSelectedId(null); // Deselect if clicked outside
        }}
        onMouseDown={handleCanvasClick}
        style={{ border: "1px solid black" }}
      >
        <Layer>
          {shapes.map((shape) => {
            if (shape.type === "circle") {
              return (
                <Circle
                  key={shape.id}
                  id={shape.id.toString()}
                  x={shape.x}
                  y={shape.y}
                  radius={shape.size}
                  fill={shape.color}
                  draggable
                  onDragEnd={(e) => handleDragEnd(shape.id, e)}
                  onClick={() => handleShapeSelect(shape.id)}
                />
              );
            }
            if (shape.type === "rectangle") {
              return (
                <Rect
                  key={shape.id}
                  id={shape.id.toString()}
                  x={shape.x}
                  y={shape.y}
                  width={shape.size}
                  height={shape.size}
                  fill={shape.color}
                  draggable
                  onDragEnd={(e) => handleDragEnd(shape.id, e)}
                  onClick={() => handleShapeSelect(shape.id)}
                />
              );
            }
            if (shape.type === "line") {
              return (
                <Line
                  key={shape.id}
                  id={shape.id.toString()}
                  points={[
                    shape.x,
                    shape.y,
                    shape.x + shape.size,
                    shape.y + shape.size,
                  ]}
                  stroke={shape.color}
                  strokeWidth={2}
                  draggable
                  onDragEnd={(e) => handleDragEnd(shape.id, e)}
                  onClick={() => handleShapeSelect(shape.id)}
                />
              );
            }
            return null;
          })}
          {selectedId && (
            <Transformer
              nodes={[
                stageRef.current.findOne(`#${selectedId}`),
              ]}
              onTransformEnd={(e) =>
                handleTransformerChange(
                  selectedId,
                  stageRef.current.findOne(`#${selectedId}`)
                )
              }
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
