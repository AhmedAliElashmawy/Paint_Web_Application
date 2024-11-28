import React, { useRef, useState } from "react";
import axios from "axios";
import { Stage, Layer, Rect, Circle, Ellipse, Line, RegularPolygon, Transformer } from "react-konva";

const Canvas = ({ shapes, setShapes, selectedShape, selectedColor, selectedSize }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [newShape, setNewShape] = useState(null);
  const stageRef = useRef(null);
  const transformerRef = useRef(null);
  const [selectedId, setSelectedId] = useState(null);

  const handleShapeSelect = async (selectedShape) => {
    const stage = stageRef.current;
    const pointerPosition = stage.getPointerPosition();

    try {
      const apiUrl = `http://localhost:8080/api/shapes`;
      const payload = {
        type: selectedShape,
        color: selectedColor,
        x: pointerPosition.x,
        y: pointerPosition.y,
      };

      const response = await axios.post(apiUrl, payload);
      console.log("Created Shape:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating shape:", error);
      alert("Failed to create shape.");
    }
  };

  const handleMouseDown = async (e) => {
    if (transformerRef.current) {
      transformerRef.current.getLayer().batchDraw();
    }

    if (selectedShape) {
      const shapeData = await handleShapeSelect(selectedShape);
      if (shapeData.type === "Triangle") {
        const pos = e.target.getStage().getPointerPosition();
        setNewShape({
          id: String(shapeData.id), // Ensure ID is a string
          type: shapeData.type,
          x1: pos.x,
          y1: pos.y,
          x2: pos.x,
          y2: pos.y,
          x3: pos.x,
          y3: pos.y,
          color: shapeData.color,
          strokeWidth: selectedSize,
        });
      }else if(shapeData.type === "LineSegment"){
        const pos = e.target.getStage().getPointerPosition();
        setNewShape({
          id: String(shapeData.id), // Ensure ID is a string
          type: shapeData.type,
          x1: pos.x,
          y1: pos.y,
          x2: pos.x,
          y2: pos.y,
          color: shapeData.color, // Set your default color
          strokeWidth: selectedSize, // Set your stroke width
        });
      }else{
      const initialShape = {
        id: String(shapeData.id), // Ensure ID is a string
        type: shapeData.type,
        x: shapeData.x,
        y: shapeData.y,
        width: 0,
        height: 0,
        color: shapeData.color,
        strokeWidth: selectedSize || 2,
      };
      setNewShape(initialShape);
    }

      setIsDrawing(true);
    } else if (e.target.attrs.id) {
      handleSelect(String(e.target.attrs.id)); // Ensure ID is a string
    } else {
      handleDeselect();
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || !newShape) return;
    if (newShape.type === "Triangle") {
      const pos = e.target.getStage().getPointerPosition();
      const { x1, y1 } = newShape;
      const x2 = pos.x;
      const y2 = y1;
      const x3 = Math.abs(x2 + x1) / 2;
      const y3 = pos.y;

      setNewShape((prev) => ({
        ...prev,
        x2,
        y2,
        x3,
        y3,
      }));
    }
    else if (selectedShape==="LineSegment" && newShape && newShape.type === "LineSegment") {
      const pos = e.target.getStage().getPointerPosition();
      setNewShape((prev) => ({
        ...prev,
        x2: pos.x,
        y2: pos.y,
      }));
    }else{
    const stage = stageRef.current;
    const pointerPosition = stage.getPointerPosition();

    const updatedShape = {
      ...newShape,
      width: pointerPosition.x - newShape.x,
      height: pointerPosition.y - newShape.y,
    };

    setNewShape(updatedShape);
  }
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
    const node = stageRef.current.findOne(`#${id}`);
    if (node && transformerRef.current) {
      transformerRef.current.nodes([node]);
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
      shape.id === String(id)
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
          if (shape.type === "Rectangle") {
            return (
              <Rect
                key={String(shape.id)} // Ensure key is a string
                id={String(shape.id)} // Ensure id is a string
                x={shape.x}
                y={shape.y}
                width={shape.width}
                height={shape.height}
                stroke={shape.color}
                strokeWidth={shape.strokeWidth}
                fill="transparent"
                draggable
                onClick={() => handleSelect(String(shape.id))} // Pass ID as a string
              />
            );
          }
          if (shape.type === "Circle") {
            return (
              <Circle
                key={String(shape.id)} // Ensure key is a string
                id={String(shape.id)} // Ensure id is a string
                x={shape.x}
                y={shape.y}
                radius={Math.abs(shape.width) / 2}
                stroke={shape.color}
                strokeWidth={shape.strokeWidth}
                fill="transparent"
                draggable
                onClick={() => handleSelect(String(shape.id))} // Pass ID as a string
              />
            );
          }
          if (shape.type === "Square") {
            return (
              <Rect
                key={String(shape.id)}
                id={String(shape.id)}
                x={shape.x}
                y={shape.y}
                width={Math.abs(shape.width)}
                height={Math.abs(shape.width)} // Square: equal width and height
                stroke={shape.color}
                strokeWidth={shape.strokeWidth}
                fill="transparent"
                draggable
                onClick={() => handleSelect(String(shape.id))}
              />
            );
          }

          if (shape.type === "Ellipse") {
            return (
              <Ellipse
                key={String(shape.id)}
                id={String(shape.id)}
                x={shape.x}
                y={shape.y}
                radiusX={Math.abs(shape.width) / 2} // Half width for radiusX
                radiusY={Math.abs(shape.height) / 2} // Half height for radiusY
                stroke={shape.color}
                strokeWidth={shape.strokeWidth}
                fill="transparent"
                draggable
                onClick={() => handleSelect(String(shape.id))}
              />
            );
          }
          if (shape.type === "LineSegment") {
            return (
              <Line
                key={String(shape.id)}
                id={String(shape.id)}
                points={[shape.x1, shape.y1, shape.x2, shape.y2]}
                stroke={shape.color}
                strokeWidth={shape.strokeWidth}
                draggable
                onClick={() => handleSelect(String(shape.id))}
              />
            );
          }
          if (shape.type === "Triangle") {
            return (
              <Line
                key={String(shape.id)}
                id={String(shape.id)}
                points={[
                  shape.x1,
                  shape.y1,
                  shape.x2,
                  shape.y2,
                  shape.x3,
                  shape.y3,
                ]}
                closed
                stroke={shape.color}
                strokeWidth={shape.strokeWidth}
                fill="transparent"
                draggable
                onClick={() => handleSelect(String(shape.id))}
              />
            );
          }
          return null;
        })}

        {newShape && newShape.type === "Rectangle" && (
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
        {newShape && newShape.type === "Square" && (
          <Rect
            x={newShape.x}
            y={newShape.y}
            width={newShape.width}
            height={newShape.width}
            stroke={newShape.color}
            strokeWidth={newShape.strokeWidth}
            fill="transparent"
          />
        )}

        {newShape && newShape.type === "Circle" && (
          <Circle
            x={newShape.x}
            y={newShape.y}
            radius={Math.abs(newShape.width) / 2}
            stroke={newShape.color}
            strokeWidth={newShape.strokeWidth}
            fill="transparent"
          />
        )}

        {newShape && newShape.type === "Ellipse" && (
        <Ellipse
          x={newShape.x}
          y={newShape.y}
          radiusX={Math.abs(newShape.width) / 2}
          radiusY={Math.abs(newShape.height) / 2}
          stroke={newShape.color}
          strokeWidth={newShape.strokeWidth}
          fill="transparent"
        />
      )}

{newShape && newShape.type === "LineSegment" && (
          <Line
            points={[newShape.x1, newShape.y1, newShape.x2, newShape.y2]}
            stroke={newShape.color}
            strokeWidth={newShape.strokeWidth}
          />
        )}

{newShape && newShape.type === "Triangle" && (
          <Line
            points={[newShape.x1, newShape.y1, newShape.x2, newShape.y2, newShape.x3, newShape.y3]}
            closed
            stroke={newShape.color}
            strokeWidth={newShape.strokeWidth}
            fill="transparent"
          />
        )}

        {selectedId &&
          (() => {
            const node = stageRef.current.findOne(`#${selectedId}`);
            if (!node) {
              console.warn(`No node found with id: ${selectedId}`);
              return null;
            }
            return (
              <Transformer
                ref={transformerRef}
                nodes={[node]}
                onTransformEnd={(e) => {
                  handleTransformerChange(selectedId, node);
                }}
                borderStroke="blue"
                borderStrokeWidth={2}
                anchorStroke="red"
                anchorFill="red"
                anchorSize={8}
              />
            );
          })()}
      </Layer>
    </Stage>
  );
};

export default Canvas;
