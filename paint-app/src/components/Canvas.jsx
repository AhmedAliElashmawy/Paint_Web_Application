import React, { useRef, useState } from "react";
import { Stage, Layer, Rect, Circle, Transformer } from "react-konva";

const Canvas = ({ shapes, setShapes, selectedShape, selectedColor, selectedSize }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [newShape, setNewShape] = useState(null);
  const stageRef = useRef(null);
  const transformerRef = useRef(null);
  const [selectedId, setSelectedId] = useState(null);

  const handleMouseDown = (e) => {
    const stage = stageRef.current;
    const pointerPosition = stage.getPointerPosition();
    
    // Ensure transformerRef is initialized before calling getLayer
    if (transformerRef.current) {
      transformerRef.current.getLayer().batchDraw();
    }

    if (selectedShape) {
      // Start drawing a new shape
      const initialShape = {
        id: Date.now().toString(),
        type: selectedShape,
        x: pointerPosition.x,
        y: pointerPosition.y,
        width: 0,
        height: 0,
        color: selectedColor || "blue",
        strokeWidth: selectedSize || 2,
      };
      setNewShape(initialShape);
      setIsDrawing(true);
    } else if (e.target.attrs.id) {
      // Select an existing shape
      handleSelect(e.target.attrs.id);
    } else {
      // Clicked outside any shape - deselect
      handleDeselect();
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || !newShape) return;

    const stage = stageRef.current;
    const pointerPosition = stage.getPointerPosition();

    const updatedShape = {
      ...newShape,
      width: pointerPosition.x - newShape.x,
      height: pointerPosition.y - newShape.y,
    };

    setNewShape(updatedShape);
  };

  const handleMouseUp = () => {
    if (isDrawing && newShape) {
      setShapes([...shapes, newShape]);
    }
    setIsDrawing(false);
    setNewShape(null);
  };

  const handleSelect = (id) => {
    setSelectedId(id);
    const selectedNode = stageRef.current.findOne(`#${id}`);

    if (selectedNode && transformerRef.current) {
      transformerRef.current.nodes([selectedNode]);
      transformerRef.current.getLayer().batchDraw();
    }
  };

  const handleDeselect = () => {
    setSelectedId(null);
    if (transformerRef.current) {
      transformerRef.current.nodes([]);
      transformerRef.current.getLayer().batchDraw();
    }
  };

  const handleTransformerChange = (id, node) => {
    const updatedShapes = shapes.map((shape) =>
      shape.id === id
        ? {
            ...shape,
            x: node.x(),
            y: node.y(),
            width: node.width(),
            height: node.height(),
            radius: shape.type === "circle" ? node.width() / 2 : shape.radius,
          }
        : shape
    );
    setShapes(updatedShapes);
  };

  return (
    <Stage
      ref={stageRef}
      width={1919}
      height={800}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onClick={(e) => {
        if (e.target === e.target.getStage()) setSelectedId(null); // Deselect if clicked outside
      }}
      style={{ border: "1px solid black" }}
    >
      <Layer>
        {shapes.map((shape) => {
          if (shape.type === "rectangle") {
            return (
              <Rect
                key={shape.id}
                id={shape.id}
                x={shape.x}
                y={shape.y}
                width={shape.width}
                height={shape.height}
                stroke={shape.color}
                strokeWidth={shape.strokeWidth}
                fill="transparent"
                draggable
                onClick={() => handleSelect(shape.id)}
              />
            );
          }
          if (shape.type === "circle") {
            return (
              <Circle
                key={shape.id}
                id={shape.id}
                x={shape.x}
                y={shape.y}
                radius={Math.abs(shape.width) / 2}
                stroke={shape.color}
                strokeWidth={shape.strokeWidth}
                fill="transparent"
                draggable
                onClick={() => handleSelect(shape.id)}
              />
            );
          }
          return null;
        })}

        {newShape && newShape.type === "rectangle" && (
          <Rect
            x={newShape.x}
            y={newShape.y}
            width={newShape.width}
            height={newShape.height}
            stroke={newShape.color}
            strokeWidth={newShape.strokeWidth}
            fill="transparent"
          />
        )}

        {newShape && newShape.type === "circle" && (
          <Circle
            x={newShape.x}
            y={newShape.y}
            radius={Math.abs(newShape.width) / 2}
            stroke={newShape.color}
            strokeWidth={newShape.strokeWidth}
            fill="transparent"
          />
        )}

        {selectedId && (
          <Transformer
            nodes={[stageRef.current.findOne(`#${selectedId}`)]}
            ref={transformerRef}
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
  );
};

export default Canvas;
